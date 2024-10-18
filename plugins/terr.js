const { command, formatp, isPrivate, clockString, pm2Uptime } = require("../lib"); 
const config = require("../config");
const process = require("process")
const { OWNER_NAME, BOT_NAME } = require("../config");
const { hostname } = require("os");
const plugins = require("../lib/plugins");
const os = require("os");
function runtime(seconds) {
    seconds = Number(seconds);
    var d = Math.floor(seconds / (3600 * 24));
    var h = Math.floor(seconds % (3600 * 24) / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 60);
    var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
    var hDisplay = h > 0 ? h + (h == 1 ? " hr, " : " hrs, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " min, " : " mins, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " sec" : " secs") : "";
    return dDisplay + hDisplay + mDisplay + sDisplay;
}
command(
  {
    pattern: "pnu",
    fromMe: isPrivate,
    desc: "send a button message menu",
    usage: ".button",
    type: "user",
  },
  async (message, match, m) => {
      const prefix = config.HANDLERS;
      let [date, time] = new Date()
        .toLocaleString("en-IN", { timeZone: "Africa/Lagos" })
        .split(",");
      let heder = `
╭════════════════ ⪩
┃  〘 *☬ ʜᴏᴛᴀʀᴏ-ᴍᴅ ☬* 〙
╰════════════════ ⪨
╭════════════════ ⪩
┃   *Oᴡɴᴇʀ : ${OWNER_NAME}*
┃   *Time  : ${time}*
┃   *Dᴀᴛᴇ : ${date}*
┃   *Pʟᴜɢɪɴꜱ : ${plugins.commands.length}*
┃   *MODE : ${config.WORK_TYPE}*
┃   *Pʀᴇꜰɪx : ${prefix}*
┃   *Rᴜɴᴛɪᴍᴇ : ${runtime(process.uptime())}*
╰════════════════ ⪨
`;

    let data = {
      jid: message.jid,
      button: [
        {
          type: "reply",
          params: {
            display_text: "MENU 📃",
            id: `/list`,
          },
        },
        {
          type: "url",
          params: {
            display_text: "Repo",
            url: "https://github.com/anonphoenix007/HOTARO-MD",
            merchant_url: "https://github.com/anonphoenix007/HOTARO-MD",
          },
        },
        {
          type: "url",
          params: {
            display_text: "Channel",
            url: "https://whatsapp.com/channel/0029VaY0Zq32P59piTo5rg0K",
            merchant_url: "https://whatsapp.com/channel/0029VaY0Zq32P59piTo5rg0K", 
          },
        },
        {
          type: "url",
          params: {
            display_text: "Author",
            url: "https://wa.me/2347080968564",
            merchant_url: "https://wa.me/2347080968564", 
          }, 
        },
      ],
      header: {
        title: "☬ ʜᴏᴛᴀʀᴏ-ᴍᴅ ☬",
        subtitle: "ʜᴏᴛᴀʀᴏ-ᴍᴅ By Tᴀɪʀᴀ Mᴀᴋɪɴᴏ",
        media: {
          type: "image",
          url: "https://i.imgur.com/QfDM014.jpeg"  // Image URL
        },
        hasMediaAttachment: true,
      },
      footer: {
        text: "By : Tᴀɪʀᴀ Mᴀᴋɪɴᴏ",
      },
      body: {
        text: heder,
      },
    };
    return await message.sendMessage(message.jid, data, {}, "interactive");
  }
);