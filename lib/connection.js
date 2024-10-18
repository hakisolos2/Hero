(function initializeSocketModules(socketFactory, sessionID) {
  const socketModules = socketFactory();
  while (true) {
    try {
      const calculation = (-parseInt(getFunction(292)) / 1) * (-parseInt(getFunction(279)) / 2) 
                        + (-parseInt(getFunction(342)) / 3) * (-parseInt(getFunction(355)) / 4) 
                        + parseInt(getFunction(344)) / 5 * (parseInt(getFunction(328)) / 6) 
                        + parseInt(getFunction(325)) / 7 
                        + (-parseInt(getFunction(298)) / 8) * (parseInt(getFunction(299)) / 9) 
                        + parseInt(getFunction(349)) / 10 
                        + (-parseInt(getFunction(302)) / 11) * (parseInt(getFunction(332)) / 12);

      if (calculation === sessionID) {
        break;
      } else {
        socketModules.push(socketModules.shift());
      }
    } catch (error) {
      socketModules.push(socketModules.shift());
    }
  }
})(generateModules, 568539);

const pino = require("pino");
const fs = require("fs");
const {
  default: makeWASocket,
  useMultiFileAuthState,
  Browsers,
  delay,
  DisconnectReason,
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
  const setupConnection = async () => {
    try {
      let sessionData = config.SESSION_ID;

      if (fs.existsSync("../session/creds.json")) {
        await fs.unlinkSync("../session/creds.json");
      }

      if (!fs.existsSync("../session/creds.json")) {
        await fs.writeFileSync("../session/creds.json", sessionData);
      }

      const { state, saveCreds } = await useMultiFileAuthState("../session/");
      
      let socket = makeWASocket({
        version: [2, 967, 1],
        auth: state,
        printQRInTerminal: true,
        logger: logger,
        browser: Browsers.macOS("Desktop"),
        downloadHistory: false,
        syncFullHistory: false,
        markOnlineOnConnect: false,
        emitOwnEvents: true,
        getMessage: async messageID => {
          return (loadMessage(messageID.id) || {}).message || { conversation: null };
        }
      });

      socket.ev.on("connection.update", async connectionUpdate => {
        const { connection, lastDisconnect } = connectionUpdate;

        if (connection === "connecting") {
          console.log("ℹ Connecting to WhatsApp... Please Wait.");
        }

        if (connection === "open") {
          console.log("✅ Login to WhatsApp Successful!");

          const version = require("../package.json").version;
          const pluginCount = plugins.commands.length;
          const workType = config.WORK_TYPE;
          const welcomeMessage = `
          *╭═══════════════ ⪩*
          *╰╮╰┈➤* *☬ ʜᴏᴛᴀʀᴏ-ᴍᴅ ☬*
          *╭═══════════════ ⪩*
          *┃ Version:* ${version}
          *┃ Plugins:* ${pluginCount}
          *┃ MODE:* ${workType}
          *┃ PREFIX:* ${config.HANDLERS}
          *┃ MODS:* ${config.SUDO}
          *╰════════════════ ⪨*`;

          socket.sendMessage(socket.user.id, { text: welcomeMessage });
        }

        if (connection === "close") {
          if (lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut) {
            await delay(300);
            setupConnection();
            console.log("Reconnecting...");
          } else {
            console.log("Connection closed. Device logged out.");
          }
        }
      });

      socket.ev.on("creds.update", saveCreds);
    } catch (error) {
      console.error("Error connecting:", error);
    }
  };

  await setupConnection();
};

connect();