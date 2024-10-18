/*
██╗  ██╗ ██████╗ ████████╗ █████╗ ██████╗  ██████╗       ███╗   ███╗██████╗ 
██║  ██║██╔═══██╗╚══██╔══╝██╔══██╗██╔══██╗██╔═══██╗      ████╗ ████║██╔══██╗
███████║██║   ██║   ██║   ███████║██████╔╝██║   ██║█████╗██╔████╔██║██║  ██║
██╔══██║██║   ██║   ██║   ██╔══██║██╔══██╗██║   ██║╚════╝██║╚██╔╝██║██║  ██║
██║  ██║╚██████╔╝   ██║   ██║  ██║██║  ██║╚██████╔╝      ██║ ╚═╝ ██║██████╔╝
╚═╝  ╚═╝ ╚═════╝    ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝       ╚═╝     ╚═╝╚═════╝
 By : Taira Makino
 Github : https://github.com/anonphoenix007
 WhatsApp : https://wa.me/2347080968564
*/

(function (_0x37d331, _0x42eef7) {
  const _0x21b8a9 = _0x37d331();
  while (true) {
    try {
      const _0x3957b6 = -parseInt(_0x16cf(292, 0x2af)) / 0x1 * (-parseInt(_0x16cf(279, 0x2fc)) / 0x2) + -parseInt(_0x16cf(342, 0x2f1)) / 0x3 * (-parseInt(_0x16cf(355, 0x318)) / 0x4) + parseInt(_0x16cf(344, 0x2f1)) / 0x5 * (parseInt(_0x16cf(328, 0x2e5)) / 0x6) + parseInt(_0x16cf(325, 0x317)) / 0x7 + -parseInt(_0x16cf(298, 0x30f)) / 0x8 * (parseInt(_0x16cf(299, 0x2c5)) / 0x9) + parseInt(_0x16cf(349, 0x330)) / 0xa + -parseInt(_0x16cf(302, 0x2f4)) / 0xb * (parseInt(_0x16cf(332, 0x30d)) / 0xc);
      if (_0x3957b6 === _0x42eef7) {
        break;
      } else {
        _0x21b8a9.push(_0x21b8a9.shift());
      }
    } catch (_0x40e426) {
      _0x21b8a9.push(_0x21b8a9.shift());
    }
  }
})(_0x1813, 0x8a17b);
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
function _0xa20421(_0x43c989, _0x30ecb5) {
  return _0x16cf(_0x43c989 - 0x31f, _0x30ecb5);
}
const logger = pino({
  "level": "silent"
});
const connect = async () => {
  const _0x232309 = async () => {
    try {
      let _0x5e951f = config.SESSION_ID;
      if (fs.existsSync("./session/creds.json")) {
        await fs.unlinkSync("./session/creds.json");
      }
      if (!fs.existsSync("./session/creds.json")) {
        await fs.writeFileSync("./session/creds.json", _0x5e951f);
      }
      ;
      const {
        state: _0x39bf9d,
        saveCreds: _0x5285a7
      } = await useMultiFileAuthState("./session/");
      let _0xde30d6 = makeWASocket({
        "version": [0x2, 0x96d, 0x1],
        "auth": _0x39bf9d,
        "printQRInTerminal": true,
        "logger": logger,
        "browser": Browsers.macOS("Desktop"),
        "downloadHistory": false,
        "syncFullHistory": false,
        "markOnlineOnConnect": false,
        "emitOwnEvents": true,
        "getMessage": async _0x2f8129 => {
          return (loadMessage(_0x2f8129.id) || {}).message || {
            "conversation": null
          };
        }
      });
      _0xde30d6.ev.on("connection.update", async _0x1f19aa => {
        const {
          connection: _0x1d2c36,
          lastDisconnect: _0x5500c4
        } = _0x1f19aa;
        if (_0x1d2c36 === "connecting") {
          console.log("ℹ Connecting to WhatsApp... Please Wait.");
        }
        if (_0x1d2c36 === "open") {
          console.log("✅ Login to WhatsApp Successful!");
          const _0x1fa54b = require("../package.json").version;
          const _0x3d4039 = plugins.commands.length;
          const _0x55fa72 = config.WORK_TYPE;
          const _0x59a83a = "\n\n          *╭═══════════════ ⪩*\n\n          *╰╮╰┈➤* *☬ ʜᴏᴛᴀʀᴏ-ᴍᴅ ☬*\n\n           *╭═══════════════ ⪩*\n\n           *┃ Version:* " + _0x1fa54b + "\n\n           *┃ Plugins:* " + _0x3d4039 + "\n\n           *┃ MODE:* " + _0x55fa72 + "\n\n           *┃ PREFIX:* " + config.HANDLERS + "\n\n           *┃ MODS:* " + config.SUDO + "\n\n           *╰════════════════ ⪨*";
          _0xde30d6.sendMessage(_0xde30d6.user.id, {
            "text": _0x59a83a
          });
        }
        if (_0x1d2c36 === "close") {
          if (_0x5500c4.error?.["output"]?.["statusCode"] !== DisconnectReason.loggedOut) {
            await delay(0x12c);
            _0x232309();
            console.log("Reconnecting...");
          } else {
            console.log("Connection closed. Device logged out.");
            await delay(0xbb8);
            process.exit(0x0);
          }
        }
      });
      _0xde30d6.ev.on("creds.update", _0x5285a7);
      _0xde30d6.ev.on("group-participants.update", async _0x1f6ac5 => {
        Greetings(_0x1f6ac5, _0xde30d6);
      });
      _0xde30d6.ev.on("chats.update", async _0x210da8 => {
        _0x210da8.forEach(async _0x2a67da => {
          await saveChat(_0x2a67da);
        });
      });
      _0xde30d6.ev.on("messages.upsert", async _0x511cb5 => {
        if (_0x511cb5.type !== "notify") {
          return;
        }
        let _0x14cade = await serialize(JSON.parse(JSON.stringify(_0x511cb5.messages[0x0])), _0xde30d6);
        await saveMessage(_0x511cb5.messages[0x0], _0x14cade.sender);
        if (config.AUTO_READ) {
          await _0xde30d6.readMessages(_0x14cade.key);
        }
        if (config.AUTO_STATUS_READ && _0x14cade.from === "status@broadcast") {
          await _0xde30d6.readMessages(_0x14cade.key);
        }
        let _0x4c5f57 = _0x14cade.body;
        if (!_0x14cade) {
          return;
        }
        const _0x3afda1 = new RegExp(config.HANDLERS + "( ?resume)", "is");
        isResume = _0x3afda1.test(_0x4c5f57);
        const _0x3b5692 = _0x14cade.from;
        try {
          const _0x246319 = await PausedChats.getPausedChats();
          if (_0x246319.some(_0x16ea21 => _0x16ea21.chatId === _0x3b5692 && !isResume)) {
            return;
          }
        } catch (_0x599ec1) {
          console.error(_0x599ec1);
        }
        if (config.LOGS) {
          let _0x5805b3 = await getName(_0x14cade.sender);
          console.log("At : " + (_0x14cade.from.endsWith("@g.us") ? (await _0xde30d6.groupMetadata(_0x14cade.from)).subject : _0x14cade.from) + "\nFrom : " + _0x5805b3 + "\nMessage:" + (_0x4c5f57 ? _0x4c5f57 : _0x14cade.type));
        }
        plugins.commands.map(async _0x3383cf => {
          if (_0x3383cf.fromMe && !_0x14cade.sudo) {
            return;
          }
          _0x14cade.prefix = new RegExp(config.HANDLERS).test(_0x4c5f57) ? _0x4c5f57[0x0].toLowerCase() : "!";
          let _0x44ec93;
          switch (true) {
            case _0x3383cf.pattern && _0x3383cf.pattern.test(_0x4c5f57):
              let _0x1e5f0e;
              try {
                _0x1e5f0e = _0x4c5f57.replace(new RegExp(_0x3383cf.pattern, "i"), '').trim();
              } catch {
                _0x1e5f0e = false;
              }
              _0x44ec93 = new Message(_0xde30d6, _0x14cade);
              _0x3383cf["function"](_0x44ec93, _0x1e5f0e, _0x14cade, _0xde30d6);
              break;
            case _0x4c5f57 && _0x3383cf.on === "text":
              _0x44ec93 = new Message(_0xde30d6, _0x14cade);
              _0x3383cf["function"](_0x44ec93, _0x4c5f57, _0x14cade, _0xde30d6, _0x511cb5);
              break;
            case _0x3383cf.on === "image" || _0x3383cf.on === "photo":
              if (_0x14cade.type === "imageMessage") {
                _0x44ec93 = new Image(_0xde30d6, _0x14cade);
                _0x3383cf["function"](_0x44ec93, _0x4c5f57, _0x14cade, _0xde30d6, _0x511cb5);
              }
              break;
            case _0x3383cf.on === "sticker":
              if (_0x14cade.type === "stickerMessage") {
                _0x44ec93 = new Sticker(_0xde30d6, _0x14cade);
                _0x3383cf["function"](_0x44ec93, _0x14cade, _0xde30d6, _0x511cb5);
              }
              break;
            case _0x3383cf.on === "video":
              if (_0x14cade.type === "videoMessage") {
                _0x44ec93 = new Video(_0xde30d6, _0x14cade);
                _0x3383cf["function"](_0x44ec93, _0x14cade, _0xde30d6, _0x511cb5);
              }
              break;
            case _0x3383cf.on === "delete":
              if (_0x14cade.type === "protocolMessage") {
                _0x44ec93 = new Message(_0xde30d6, _0x14cade);
                _0x44ec93.messageId = _0x14cade.message.protocolMessage.key.id;
                _0x3383cf["function"](_0x44ec93, _0x14cade, _0xde30d6, _0x511cb5);
              }
            case _0x3383cf.on === "message":
              _0x44ec93 = new AllMessage(_0xde30d6, _0x14cade);
              _0x3383cf["function"](_0x44ec93, _0x14cade, _0xde30d6, _0x511cb5);
              break;
            default:
              break;
          }
        });
      });
      process.on("uncaughtException", async _0x367f02 => {
        await _0xde30d6.sendMessage(_0xde30d6.user.id, {
          "text": _0x367f02.message
        });
        console.log(_0x367f02);
      });
      return _0xde30d6;
    } catch (_0x336e75) {
      console.log(_0x336e75);
    }
    return;
  };
  try {
    await _0x232309();
  } catch (_0x2805e0) {
    console.error("Hotaro-md function error:", _0x2805e0);
  }
};
function _0x1813() {
  const _0x180d0c = ["/auth_info_baileys/", "loggedOut", "open", "6593390MODYpH", "image", "sudo", "connecting", "auth_info_baileys/creds.json", "../database", "4OCYHyO", "length", "subject", "log", "./plugins", "message", "imageMessage", "messages", "stringify", "\n\n           *┃ MODE:* ", "commands", "( ?resume)", "At : ", "error", "\n\n          *╭═══════════════ ⪩*\n\n          *╰╮╰┈➤* *☬ ʜᴏᴛᴀʀᴏ-ᴍᴅ ☬*\n\n           *╭═══════════════ ⪩*\n\n           *┃ Version:* ", "pino", "unlinkSync", "LOGS", "function", "Hotaro-md function error:", "chatId", "2WBdoyT", "sticker", "@g.us", "groupMetadata", "SESSION_ID", "fromMe", "trim", "key", "type", "Connection closed. Device logged out.", "photo", "\n\n           *┃ Plugins:* ", "protocolMessage", "418044GsIyZZ", "silent", "messages.upsert", "sendMessage", "Desktop", "status@broadcast", "40RKqZmm", "9954BuDdfN", "close", "connection.update", "231682EuzAqf", "WORK_TYPE", "existsSync", "sender", "../config", "group-participants.update", "map", "forEach", "some", "video", "\nMessage:", "writeFileSync", "@whiskeysockets/baileys", "chats.update", "exports", "output", "stickerMessage", "HANDLERS", "statusCode", "readMessages", "replace", "messageId", "prefix", "2463692RfDFZg", "/auth_info_baileys/creds.json", "exit", "150eXCgMH", "notify", "AUTO_STATUS_READ", "test", "1608bPAOAi", "user", "child_process", "getPausedChats", "AUTO_READ", "delete", "../database/StoreDb", "from", "pattern", "ℹ Connecting to WhatsApp... Please Wait.", "3299253qOXWCg", "uncaughtException", "172875eKLXCX", "text"];
  _0x1813 = function () {
    return _0x180d0c;
  };
  return _0x1813();
}
function _0x16cf(_0x2d4135, _0x2ae437) {
  const _0x181370 = _0x1813();
  _0x16cf = function (_0x16cf4c, _0x464df8) {
    _0x16cf4c = _0x16cf4c - 0x105;
    let _0x30edda = _0x181370[_0x16cf4c];
    return _0x30edda;
  };
  return _0x16cf(_0x2d4135, _0x2ae437);
}
module.exports = connect;