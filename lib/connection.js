const pino = require("pino");
const fs = require("fs");
const { default: makeWASocket, useMultiFileAuthState, Browsers, delay, DisconnectReason } = require("@whiskeysockets/baileys");
const { PausedChats } = require("../database");
const config = require("../config");
const plugins = require("./plugins");
const { serialize, Greetings } = require("./index");
const { Image, Message, Sticker, Video, AllMessage } = require("./Messages");
const { loadMessage, saveMessage, saveChat, getName } = require("../database/StoreDb");

const logger = pino({ level: "silent" });

const connect = async () => {
  const initializeConnection = async () => {
    try {
      let sessionID = config.SESSION_ID;

      if (fs.existsSync(__dirname + "session/creds.json")) {
        await fs.unlinkSync(__dirname + "session/creds.json");
      }

      if (!fs.existsSync(__dirname + "/session/creds.json")) {
        await fs.writeFileSync(__dirname + "/session/creds.json", sessionID);
      }

      const { state, saveCreds } = await useMultiFileAuthState(__dirname + "/session/");

      let socket = makeWASocket({
        version: [2, 1509, 1],
        auth: state,
        printQRInTerminal: true,
        logger: logger,
        browser: Browsers.macOS("Desktop"),
        downloadHistory: false,
        syncFullHistory: false,
        markOnlineOnConnect: false,
        emitOwnEvents: true,
        getMessage: async (messageID) => (loadMessage(messageID.id) || {}).message || { conversation: null },
      });

      socket.ev.on("connection.update", async (update) => {
        const { connection, lastDisconnect } = update;

        if (connection === "connecting") {
          console.log("ℹ Connecting to WhatsApp... Please Wait.");
        }

        if (connection === "open") {
          console.log("✅ Login to WhatsApp Successful!");

          const version = require("../package.json").version;
          const numPlugins = plugins.commands.length;
          const workMode = config.WORK_TYPE;

          const message = `
             *╭「 NEXUS-BOT 」─✧*
      *├ 💻 Version:* ${version}
      *├ 📂 Plugins:* ${numPlugins}
      *├ ⚙️ Mode:* ${workMode}
      *├ 🛠 Prefix:* ${config.HANDLERS}
      *├ 👑 Admins:* ${config.SUDO}
      *╰─────────────────★*
      CONNECTION SUCCESSFUL ✅`;

// Send image with caption
const imageUrl = "https://i.imgur.com/4mLOG7q.jpeg";
await socket.sendMessage(socket.user.id, {
  image: { url: imageUrl },
  caption: message.trim(),
});
        }

        if (connection === "close") {
          if (lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut) {
            await delay(300);
            initializeConnection();
            console.log("Reconnecting...");
          } else {
            console.log("Connection closed. Device logged out.");
            await delay(3000);
            process.exit(0);
          }
        }
      });

      socket.ev.on("creds.update", saveCreds);

      socket.ev.on("group-participants.update", async (update) => {
        Greetings(update, socket);
      });

      socket.ev.on("chats.update", async (chats) => {
        chats.forEach(async (chat) => {
          await saveChat(chat);
        });
      });

      socket.ev.on("messages.upsert", async (messageUpdate) => {
        if (messageUpdate.type !== "notify") return;

        let message = await serialize(JSON.parse(JSON.stringify(messageUpdate.messages[0])), socket);
        await saveMessage(messageUpdate.messages[0], message.sender);

        if (config.AUTO_READ) {
          await socket.readMessages(message.key);
        }

        if (config.AUTO_STATUS_READ && message.from === "status@broadcast") {
          await socket.readMessages(message.key);
        }

        let messageBody = message.body;
        if (!messageBody) return;

        const resumePattern = new RegExp(config.HANDLERS + "( ?resume)", "is");
        const isResume = resumePattern.test(messageBody);

        try {
          const pausedChats = await PausedChats.getPausedChats();
          if (pausedChats.some(chat => chat.chatId === message.from && !isResume)) return;
        } catch (error) {
          console.error(error);
        }

        if (config.LOGS) {
          let senderName = await getName(message.sender);
          console.log(`At: ${message.from.endsWith("@g.us") ? (await socket.groupMetadata(message.from)).subject : message.from}\nFrom: ${senderName}\nMessage: ${messageBody ? messageBody : message.type}`);
        }

        plugins.commands.forEach(async (command) => {
          if (command.fromMe && !message.sudo) return;

          message.prefix = new RegExp(config.HANDLERS).test(messageBody) ? messageBody[0].toLowerCase() : "!";

          switch (true) {
            case command.pattern && command.pattern.test(messageBody):
              let args = messageBody.replace(new RegExp(command.pattern, "i"), '').trim();
              let cmdMessage = new Message(socket, message);
              command.function(cmdMessage, args, message, socket);
              break;

            case messageBody && command.on === "text":
              let textMessage = new Message(socket, message);
              command.function(textMessage, messageBody, message, socket, messageUpdate);
              break;

            case command.on === "image" && message.type === "imageMessage":
              let imgMessage = new Image(socket, message);
              command.function(imgMessage, messageBody, message, socket, messageUpdate);
              break;

            case command.on === "sticker" && message.type === "stickerMessage":
              let stickerMessage = new Sticker(socket, message);
              command.function(stickerMessage, message, socket, messageUpdate);
              break;

            case command.on === "video" && message.type === "videoMessage":
              let videoMessage = new Video(socket, message);
              command.function(videoMessage, message, socket, messageUpdate);
              break;

            case command.on === "delete" && message.type === "protocolMessage":
              let deleteMessage = new Message(socket, message);
              deleteMessage.messageId = message.message.protocolMessage.key.id;
              command.function(deleteMessage, message, socket, messageUpdate);
              break;

            case command.on === "message":
              let allMessage = new AllMessage(socket, message);
              command.function(allMessage, message, socket, messageUpdate);
              break;
          }
        });
      });

      process.on("uncaughtException", async (error) => {
        await socket.sendMessage(socket.user.id, { text: error.message });
        console.log(error);
      });

      return socket;
    } catch (error) {
      console.log(error);
    }
    return;
  };

  try {
    await initializeConnection();
  } catch (error) {
    console.error("Queen Alya function error:", error);
  }
};

module.exports = connect;