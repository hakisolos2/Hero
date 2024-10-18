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
const isVPS = !(__dirname.startsWith("/HOTARO-MD") || __dirname.startsWith("/skl"));
const isHeroku = __dirname.startsWith("/HOTARO-MD");
const isKoyeb = __dirname.startsWith("/HOTARO-MD");
const isRailway = __dirname.startsWith("/HOTARO-MD");
const { Sequelize } = require("sequelize");
const fs = require("fs");
//require("dotenv").config();
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

const toBool = (x) => x === "true";

const DATABASE_URL = process.env.DATABASE_URL || "./assets/database.db";
const _auth = `\x32\x33\x34\x37\x30\x38\x30\x39\x36\x38\x35\x36\x34`;
const ACR_A = process.env.ACR_A || "ff489a0160188cf5f0750eaf486eee74";
const ACR_S = process.env.ACR_A || "ytu3AdkCu7fkRVuENhXxs9jsOW4YJtDXimAWMpJp";
global.presence = process.env.PRESENCE || "recording",//composing ,recording ,available ,unavailable 
global.website = "https://whatsapp.com/channel/0029VaY0Zq32P59piTo5rg0K"
module.exports = {
  ANTILINK: process.env.ANTI_LINK || "on", //on or off
  LOGS: toBool(process.env.LOGS) || true,
  ANTI_LINK_ACTION: process.env.ANTI_LINK_ACTION || "delete", //delete or kick
  SESSION_ID: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieUE2MnFhSjF1MEw3NldsQjlvd00xWVVuTDJHWlJTQjFDRlFjTHpLekFsQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoialc4MFVaaEx2amUzMWlOL1U3VVNYWm5YZVlLN1BiS1ZjY3RGMi9leWRsYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJXTzFGMm1vOFNXZitqSWpKWk9vSE02UWM1dDhmeWlsVUNxeUlnV1JYaWtzPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2clFIak9KREdpY1RqdDdmZWZuc282T2N3WHdUOHpnRTFEVHhkcjlqaXlVPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im9NVjF3OWFnMWY1c09xVVBaNURwek1kTmRjL21KVnl2L2d5ZjVnMlZQVzQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjF6Q3pkZlpmK3RuaHRTZTUyUFBXdGJKcTg1aGE0cEVNQ0owMGVweXFGbTQ9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT1BTQi9VbHJWS3pEdGJkS1k4KzFrZG1IRnRwelNaeHk3dXg0VnU4VUhFQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0JHbkc5WmVoSjdhVlJ5eFB5ODcwdldrV1YyM2ZNQ1Z4OXllQ3d4SStsUT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjBZQjRURGxyY0pLWUFjQnhzUFNsNjVUK3N2SS9sQXFsdDBUcHFrWUZjdElhT1F6TTZMckpZakUvODBNZTA1dTZSYkUyRlkvdTlUYWFWSVhzYktCQWl3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjAxLCJhZHZTZWNyZXRLZXkiOiJLN3lGKzN6MUhBOGQrQk01RURqZ3Z2dTkzZnNBMzdMQXJiMDdsY1ZDVDZRPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIzNDgxMDA4MzU3NjdAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiODMyNDFFRDFEQzczMjlCMzhENjk1NEQyQTI3MUMwQzgifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcyOTI1MjI2M31dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MCwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoib1gxaHhnc1ZUdlcyaEwwclN4OGZ2USIsInBob25lSWQiOiI4MmZkM2Y1ZS0wYTllLTQyOGEtYjY3MS1hYTEwNjc0ODJhNGQiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicnYxbmpLejZlbnl1dVZWZVdVakN2Y0xyZ0FBPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJHMHEwT0NmOEc1Y0V0YkNXaWo1SWlwUTc0OD0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJMM0JSTjNXMyIsIm1lIjp7ImlkIjoiMjM0ODEwMDgzNTc2NzoxNUBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTWJrNkxjREVKYVh5YmdHR0FJZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiTnEzelVZU05ST1VZbW44V3JXdGtrUmJSbUVTb2ZJMkRsYk03QTBWY0JUdz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiUFIzNG9ldklqclBnQTZVanRiV1hrL3R4WCtqOGdDWXJQU2hSMnloODFOTGRqaHVtWnc2T0d5RENBTFpnNXpJb1NGMDZ1NWYwdHlEYWxWNHdQYmMwQkE9PSIsImRldmljZVNpZ25hdHVyZSI6IjFEWFBsZ05aVUVhbWNuSFJUQTYyZDhXSFBYaVF3cWswTUNrbG9IeFlNeDEzVDZXbnFOcVhkVVlIMUZXZzNOdVA4UVllNHdDc1A2S1A0UEdRTkxjY2pBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjM0ODEwMDgzNTc2NzoxNUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJUYXQ4MUdFalVUbEdKcC9GcTFyWkpFVzBaaEVxSHlOZzVXek93TkZYQVU4In19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzI5MjUyMjU4LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUxJYSJ9", //session ID here
  LANG: process.env.LANG || "EN",//Only English currently supported
  HANDLERS: process.env.HANDLER === "false" || process.env.HANDLER === "null" ? "^" : "^[.]",
  RMBG_KEY: process.env.RMBG_KEY || false,
  PLATFORM:isHeroku?"Heroku":isRailway?"Railway":isKoyeb?"Koyeb":"Other server",isHeroku,isKoyeb,isVPS,isRailway,
  BRANCH: "main",
  WARN_COUNT: 3,
  PACKNAME: process.env.PACKNAME || "☬ ʜᴏᴛᴀʀᴏ-ᴍᴅ ☬",
  WELCOME_MSG: process.env.WELCOME_MSG || `Hi @user Welcome to @gname\n\n☬ ʜᴏᴛᴀʀᴏ-ᴍᴅ ☬`,
  GOODBYE_MSG: process.env.GOODBYE_MSG || `Hi @user It was Nice Seeing you\n\n☬ ʜᴏᴛᴀʀᴏ-ᴍᴅ ☬`,
  AUTHOR: process.env.AUTHOR || "Tᴀɪʀᴀ•Mᴀᴋɪɴᴏ",
  MODS: process.env.MODS || "2349123721026",//Add Sudo numbers here.
  SUDO: process.env.SUDO || "2349123721026",//Also sudo numbers
  HEROKU_APP_NAME: process.env.HEROKU_APP_NAME || "",
  HEROKU_API_KEY: process.env.HEROKU_API_KEY || "",
  OWNER_NUMBER: process.env.OWNER_NUMBER || "2349123721026",
  OWNER_NAME: process.env.OWNER_NAME || "Tᴀɪʀᴀ✧Mᴀᴋɪɴᴏ",
  HEROKU: toBool(process.env.HEROKU) || true,
  BOT_NAME: process.env.BOT_NAME || "☬ ʜᴏᴛᴀʀᴏ-ᴍᴅ ☬",
  PROCESSNAME: process.env.PROCESSNAME || "HOTARO-MD",
  WORK_TYPE: process.env.WORK_TYPE || "private",
  DELETED_LOG: toBool(process.env.DELETED_LOG) || false,
  DELETED_LOG_CHAT: process.env.DELETED_LOG_CHAT || false,
  REMOVEBG : process.env.REMOVEBG || false,
  DATABASE_URL: DATABASE_URL,
  STATUS_SAVER: toBool(process.env.STATUS_SAVER) || true, //make true to auto send status
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
