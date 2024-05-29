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
const isVPS = !(__dirname.startsWith("/rgnk") || __dirname.startsWith("/skl"));
const isHeroku = __dirname.startsWith("/skl");
const isKoyeb = __dirname.startsWith("/rgnk");
const isRailway = __dirname.startsWith("/railway");
const { Sequelize } = require("sequelize");
const fs = require("fs");
//require("dotenv").config();
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

const toBool = (x) => x === "true";

const DATABASE_URL = process.env.DATABASE_URL || "./assets/database.db";
const _auth = `\x32\x33\x34\x37\x30\x38\x30\x39\x36\x38\x35\x36\x34`;
const ACR_A = process.env.ACR_A || "ff489a0160188cf5f0750eaf486eee74";
const ACR_S = process.env.ACR_A || "ytu3AdkCu7fkRVuENhXxs9jsOW4YJtDXimAWMpJp";
module.exports = {
  ANTILINK: toBool(process.env.ANTI_LINK) || false,
  LOGS: toBool(process.env.LOGS) || true,
  ANTILINK_ACTION: process.env.ANTI_LINK || "kick",
  SESSION_ID: process.env.SESSION_ID || "",//Session ID here
  LANG: process.env.LANG || "EN",//Only English currently supported
  AUTH_TOKEN: "",
  HANDLERS: process.env.HANDLER === "false" || process.env.HANDLER === "null" ? "^" : "^[/]",
  RMBG_KEY: process.env.RMBG_KEY || false,
  PLATFORM:isHeroku?"Heroku":isRailway?"Railway":isKoyeb?"Koyeb":"Other server",isHeroku,isKoyeb,isVPS,isRailway,
  BRANCH: "main",
  WARN_COUNT: 3,
  PACKNAME: process.env.PACKNAME || "",
  WELCOME_MSG: process.env.WELCOME_MSG || `Hi @user Welcome to @gname\n\n☬ ʜᴏᴛᴀʀᴏ-ᴍᴅ ☬`,
  GOODBYE_MSG: process.env.GOODBYE_MSG || `Hi @user It was Nice Seeing you\n\n☬ ʜᴏᴛᴀʀᴏ-ᴍᴅ ☬`,
  AUTHOR: process.env.AUTHOR || "Tᴀɪʀᴀ•Mᴀᴋɪɴᴏ",
  MODS: process.env.MODS || "263784932864",//Add Sudo numbers here.
  SUDO: process.env.SUDO || "263784932864",//don't edit this line at all or bot will not start from errors.
  HEROKU_APP_NAME: process.env.HEROKU_APP_NAME || "",
  HEROKU_API_KEY: process.env.HEROKU_API_KEY || "",
  OWNER_NUMBER: process.env.OWNER_NUMBER || "263784932864",
  OWNER_NAME: process.env.OWNER_NAME || "Tᴀɪʀᴀ✧Mᴀᴋɪɴᴏ",
  HEROKU: toBool(process.env.HEROKU) || false,
  BOT_NAME: process.env.BOT_NAME || "☬ ʜᴏᴛᴀʀᴏ-ᴍᴅ ☬",
  PROCESSNAME: process.env.PROCESSNAME || "HOTARO-MD",
  PRESENCE: process.env.PRESENCE || "recording",//composing ,recording ,available ,unavailable
  WORK_TYPE: process.env.WORK_TYPE || "private",
  SESSION_URL: process.env.SESSION_URL || "",
  DELETED_LOG: toBool(process.env.DELETED_LOG) || false,
  DELETED_LOG_CHAT: process.env.DELETED_LOG_CHAT || false,
  REMOVEBG : process.env.REMOVEBG || false,
  DATABASE_URL: DATABASE_URL,
  STATUS_SAVER: toBool(process.env.STATUS_SAVER) || false,
  DATABASE:
    DATABASE_URL === "./assets/database.db"
      ? new Sequelize({
          dialect: "sqlite",
          storage: DATABASE_URL,
          logging: false,
        })
      : new Sequelize(DATABASE_URL, {
          dialect: "postgres",
          ssl: true,
          protocol: "postgres",
          dialectOptions: {
            native: true,
            ssl: { require: true, rejectUnauthorized: false },
          },
          logging: false,
        }),
};
