const pino = require("pino");
const fs = require("fs");
const {
  default: makeWASocket,
  useMultiFileAuthState,
  Browsers,
  delay,
  DisconnectReason
} = require("@whiskeysockets/baileys");
const {
  PausedChats
} = require("../database");
const config = require("../config");
const plugins = require("./plugins");
const {
  serialize,
  Greetings
} = require("./index");
const {
  Image,
  Message,
  Sticker,
  Video,
  AllMessage
} = require("./Messages");
const {
  loadMessage,
  saveMessage,
  saveChat,
  getName
} = require("../database/StoreDb");

const logger = pino({ level: "silent" });

const connect = async () => {
  const startConnection = async () => {
    try {
      const sessionPath = __dirname + "/session/creds.json";

      if (fs.existsSync(sessionPath)) {
        fs.unlinkSync(sessionPath);
      }

      if (!fs.existsSync(sessionPath)) {
        fs.writeFileSync(sessionPath, config.SESSION_ID);
      }

      const { state, saveCreds } = await useMultiFileAuthState(__dirname + "/session/");
      let socket = makeWASocket({
        version: [2, 1576, 11],
        auth: state,
        printQRInTerminal: true,
        logger: logger,
        browser: Browsers.macOS("Desktop"),
        downloadHistory: false,
        syncFullHistory: false,
        markOnlineOnConnect: false,
        emitOwnEvents: true,
        getMessage: async msgKey => {
          return (loadMessage(msgKey.id) || {}).message || { conversation: null };
        }
      });

      socket.ev.on("connection.update", async update => {
        const { connection, lastDisconnect } = update;

        if (connection === "connecting") {
          console.log("ℹ Connecting to WhatsApp... Please Wait.");
        }

        if (connection === "open") {
          console.log("✅ Login to WhatsApp Successful!");
          
          const version = require("../package.json").version;
          const pluginCount = plugins.commands.length;
          const mode = config.WORK_TYPE;

          const connectionMessage = `*NEXUS-BOT*\nVersion: ${version}\nPlugins: ${pluginCount}\nMode: ${mode}\nPrefix: ${config.HANDLERS}\nMods: ${config.SUDO}`;

          await socket.sendMessage(socket.user.id, {
            image: { url: "https://i.imgur.com/4mLOG7q.jpeg" },
            caption: connectionMessage
          });
        }

        if (connection === "close") {
          if (lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut) {
            await delay(300);
            startConnection();
            console.log("Reconnecting...");
          } else {
            console.log("Connection closed. Device logged out.");
            await delay(3000);
            process.exit(0);
          }
        }
      });

      socket.ev.on("creds.update", saveCreds);
      socket.ev.on("group-participants.update", async update => {
        Greetings(update, socket);
      });

      socket.ev.on("chats.update", async updates => {
        updates.forEach(async chat => {
          await saveChat(chat);
        });
      });

      socket.ev.on("messages.upsert", async messageUpdate => {
        if (messageUpdate.type !== "notify") return;

        let message = await serialize(JSON.parse(JSON.stringify(messageUpdate.messages[0])), socket);
        await saveMessage(messageUpdate.messages[0], message.sender);

        if (config.AUTO_READ) {
          await socket.readMessages(message.key);
        }

        if (config.AUTO_STATUS_READ && message.from === "status@broadcast") {
          await socket.readMessages(message.key);
        }

        const body = message.body;
        if (!message) return;

        const resumePattern = new RegExp(config.HANDLERS + "( ?resume)", "is");
        const isResume = resumePattern.test(body);
        const chatId = message.from;

        try {
          const pausedChats = await PausedChats.getPausedChats();
          if (pausedChats.some(chat => chat.chatId === chatId && !isResume)) return;
        } catch (err) {
          console.error(err);
        }

        if (config.LOGS) {
          const senderName = await getName(message.sender);
          console.log(`At: ${message.from.endsWith("@g.us") ? (await socket.groupMetadata(message.from)).subject : message.from}\nFrom: ${senderName}\nMessage: ${body ? body : message.type}`);
        }

        plugins.commands.forEach(async command => {
          if (command.fromMe && !message.sudo) return;

          message.prefix = new RegExp(config.HANDLERS).test(body) ? body[0].toLowerCase() : "!";

          let msgInstance;
          switch (true) {
            case command.pattern && command.pattern.test(body):
              let input;
              try {
                input = body.replace(new RegExp(command.pattern, "i"), '').trim();
              } catch {
                input = false;
              }
              msgInstance = new Message(socket, message);
              command.function(msgInstance, input, message, socket);
              break;

            case body && command.on === "text":
              msgInstance = new Message(socket, message);
              command.function(msgInstance, body, message, socket, messageUpdate);
              break;

            case command.on === "image" || command.on === "photo":
              if (message.type === "imageMessage") {
                msgInstance = new Image(socket, message);
                command.function(msgInstance, body, message, socket, messageUpdate);
              }
              break;

            case command.on === "sticker":
              if (message.type === "stickerMessage") {
                msgInstance = new Sticker(socket, message);
                command.function(msgInstance, message, socket, messageUpdate);
              }
              break;

            case command.on === "video":
              if (message.type === "videoMessage") {
                msgInstance = new Video(socket, message);
                command.function(msgInstance, message, socket, messageUpdate);
              }
              break;

            case command.on === "delete":
              if (message.type === "protocolMessage") {
                msgInstance = new Message(socket, message);
                msgInstance.messageId = message.message.protocolMessage.key.id;
                command.function(msgInstance, message, socket, messageUpdate);
              }
              break;

            case command.on === "message":
              msgInstance = new AllMessage(socket, message);
              command.function(msgInstance, message, socket, messageUpdate);
              break;

            default:
              break;
          }
        });
      });

      process.on("uncaughtException", async err => {
        await socket.sendMessage(socket.user.id, { text: err.message });
        console.log(err);
      });

      return socket;
    } catch (err) {
      console.log(err);
    }
  };

  try {
    await startConnection();
  } catch (error) {
    console.error("Connection error:", error);
  }
};

module.exports = connect;