const { command, isPrivate } = require("../lib");
const prefi = require("../config");
const process = require("process")
const { OWNER_NAME, BOT_NAME } = require("../config");
const { hostname } = require("os");

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


/*command(
  {
    pattern: "menu",
    fromMe: isPrivate,
    desc: "send command list.",
    usage: "menu",
    type: "user",
  },
  async (message, match, m) => {
    let heder = `
╭════════════════ ⪩
┃  〘 *☬ ʜᴏᴛᴀʀᴏ-ᴍᴅ ☬* 〙
╰════════════════ ⪨
╭════════════════ ⪩
┃   *Oᴡɴᴇʀ : ${OWNER_NAME}
┃   *Time  : ${time}*
┃   *Dᴀᴛᴇ : ${date}*
┃   *Oᴡɴᴇʀ : ${global.OwnerName}*
┃   *Pʟᴜɢɪɴꜱ : ${plugins.commands.length}*
┃   *Pʀᴇꜰɪx : ${prefix}*
┃   *Rᴜɴᴛɪᴍᴇ : ${runtime(process.uptime())}*
╰════════════════ ⪨
  By : Tᴀɪʀᴀ Mᴀᴋɪɴᴏ
`;
    let data = {
      jid: message.jid,
      button: [
        {
          type: "list",
          params: {
            title: "Menu 📃",
            sections: [
              {
                title: "Menu 📃",
                rows: [
                  {
                    header: heder,
                    title: "Menu 📃",
                    description: "Command list",
                    id: "/menu",
                  },
                ],
              },
            ],
          },
        },
        {
          type: "reply",
          params: {
            display_text: "Menu 📃",
            id: "/menu",
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
            display_text: "Author",
            url: "https://wa.me/2347080968564",
            merchant_url: "https://wa.me/2347080968564",
          },
        },
        {
          type: "url",
          params: {
            display_text: "Channel",
            url: "https://whatsapp.com/channel/0029VaY0Zq32P59piTo5rg0K",
            merchant_url: "https://whatsapp.com/channel/0029VaY0Zq32P59piTo5rg0K",
          },
        }
      ],
      header: {
        title: "☬ ʜᴏᴛᴀʀᴏ-ᴍᴅ ☬",
        subtitle: "ʜᴏᴛᴀʀᴏ-ᴍᴅ WABOT",
        hasMediaAttachment: false,
      },
      footer: {
        text: "☬ ʜᴏᴛᴀʀᴏ-ᴍᴅ ☬",
      },
      body: {
        text: "☬ ʜᴏᴛᴀʀᴏ-ᴍᴅ ☬",
      },
    };
    return await message.sendMessage(message.jid, {text: heder }, data, {}, "interactive");
  }
);*/

const { command, isPrivate } = require("../lib");

command(
  {
    pattern: "menu",
    fromMe: isPrivate,
    desc: "send a button message menu",
    usage: ".button",
    type: "user",
  },
  async (message, match, m) => {
    let data = {
      jid: message.jid,
      button: [
        {
          type: "list",
          params: {
            title: "Button 1",
            sections: [
              {
                title: "Button 1",
                rows: [
                  {
                    header: "title",
                    title: "Button 1",
                    description: "Description 1",
                    id: "/menu",
                  },
                ],
              },
            ],
          },
        },
        {
          type: "reply",
          params: {
            display_text: "MENU",
            id: "/menu",
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
        hasMediaAttachment: false,
      },
      footer: {
        text: "By : Tᴀɪʀᴀ Mᴀᴋɪɴᴏ",
      },
      body: {
        text: "Interactive Menu",
      },
    };
    return await message.sendMessage(message.jid, data, {}, "interactive");
  }
);
