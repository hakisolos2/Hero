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
  SESSION_ID: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ0oyaE9jcC9OK3VaTkUrOVI3Z1M4SVNsYzROYTMvRTlOcTdYMmZvL0UxZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMkM4WVRuV0hacUlPdzBhOW5OTDBSNHdvWVJRdURPN1E4ZTNhS2krQkZBcz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrTUZvQTNUWlZoR2ZqM1RiR2RmOWdmR0FXWmFpR1NHeEZhK09KdE5PR1ZzPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ1aWlKOGtMdEhzVUhhS3N2cVpDT1c2MkhYT2RURjFtVFVjVUZ0QS9PWkVzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJCNEN2T2h4OVhybjViQkwveVV0d2pOUmVuYWRsSTU2VnF0dUhxWmRIME09In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJQMVhOVUZWbm54SVZLL3ZsOVV6ZExrL0M2NCtTRHNuZUFRL1lkSy9qMGM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMElIQ3F3N0Zod05aa214RTBIb0FOeWFCaEJkS1YyVFZYVjNkdS9zMElIND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTXI3NFBEYlhJcVR5OEVHd2FiZ0RpcjNYeVlrdjdZdVlkby8vMDNtRzloWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik51UmRSWEZISWV5eXo4Y1ZoUTNHaVowOVA3cjQ0dTJVdnlvNzQrajFqOEs3UDJxNUh5WGtzVzdXN1A1OEo1ak9NeFpIMlF4eldpSURjWnFXdWdNa2hRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTA4LCJhZHZTZWNyZXRLZXkiOiJiTjZGUmVlWjIyUjlSRjMwaWRIV2RYTlRBcnMrUkpucEc0SzhJSWQxTW1ZPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiI5blVZSk1GdVJ5LVhaSldvUmhJVmJBIiwicGhvbmVJZCI6ImY3ZDA5MzYzLTA2YmQtNDE4OC04MTNlLWY5YTJlZmMyZmE1MCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNUjBVcnNvQ0FTL1hsM0t3LzdHM29RVG5BMms9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiL1p1V2ZTa0lrRWN2NUlZMjdXcWRrdmFlaFNVPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkRENlM5TlYxIiwibWUiOnsiaWQiOiIyNjM3ODQ5MzI4NjQ6N0BzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJUXG5cblxu4bSAXG5cblxuyapcblxuXG7KgFxuXG5cbuG0gFxuXG4gXG5NXG5cblxu4bSAXG5cblxu4bSLXG5cblxuyapcblxuXG7JtFxuXG5cbuG0jyAgICBjbG9uZSJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDS3E4bHVvREVLeVN5YklHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiY1JCYkhFQnFGYnFiUUdlNEhQMVl4c0J6eW5icVQ1VlJwSWsyWk1US2tFbz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiYVZqZkJnSUhoNmFGeWQvZHBEVzhOSHNPemF2Nlk4cGJwK01SK2dLcE1HWW0rMTQwZjNOc2FMNElIeUlTcUhYWEphZHVNbDltWHZOTUJTMm9tU1RrQWc9PSIsImRldmljZVNpZ25hdHVyZSI6IlVFcUFaR2lOalNUanFQbVY2eXcwajZHVkNMTTNxVE9tYzEzeGxwdHE1RnpxNC9rbUFqQ2pmREdOOUNZaVhtb3pCWEExSVZIVlRwY1ZPcHJVdlA1empnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjYzNzg0OTMyODY0OjdAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWEVRV3h4QWFoVzZtMEJudUJ6OVdNYkFjOHAyNmsrVlVhU0pObVRFeXBCSyJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcxNjY2ODczMH0=",//Session ID here
  LANG: process.env.LANG || "EN",//Only English currently supported
  AUTH_TOKEN: "",
  HANDLERS: process.env.HANDLER === "false" || process.env.HANDLER === "null" ? "^" : "^[/]",
  RMBG_KEY: process.env.RMBG_KEY || false,
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
