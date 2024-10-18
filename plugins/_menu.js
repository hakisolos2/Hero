const plugins = require("../lib/plugins");
const { command, isPrivate, clockString, pm2Uptime } = require("../lib");
const process = require("process")
const { OWNER_NAME, BOT_NAME } = require("../config");
const { hostname } = require("os");
const translate = require('@vitalets/google-translate-api');
const acrcloud = require("acrcloud");
const fs = require("fs");
const acr = new acrcloud({
  host: "identify-eu-west-1.acrcloud.com",
  access_key: process.env.ACR_A,
  access_secret: process.env.ACR_S
});
const long = String.fromCharCode(8206);
const readmore = long.repeat(4001);
const {
    downloadContentFromMessage,
    BufferJSON,
    WA_DEFAULT_EPHEMERAL,
    generateWAMessageFromContent,
    proto,
    generateWAMessageContent,
    prepareWAMessageMedia,
    areJidsSameUser,
    InteractiveMessage,
    getContentType,
    jidDecode,
    delay
} = require('@whiskeysockets/baileys')
const config = require("../config")
async function findMusic(file){
return new Promise((resolve,reject)=>{
acr.identify(file).then(result => {
  var data = result.metadata?.music[0];
  resolve(data);
});
});
}
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
        pattern: "alive",
        fromMe: isPrivate,
        desc: "alive",
        type: "user"
    }, async (message) => {
        await message.sendMessage(message.jid, { text: `☬ ʜᴏᴛᴀʀᴏ-ᴍᴅ ☬ has been alive since *_${runtime(process.uptime())}_*` })
    }
);
command(
  {
    pattern: "list",
    fromMe: isPrivate,
    desc: "Show All Commands",
    dontAddCommandList: true,
    type: "user",
  },
  async (message, match) => {
   
    if (match) {
      for (let i of plugins.commands) {
        if (
          i.pattern instanceof RegExp &&
          i.pattern.test(message.prefix + match)
        ) {
          const cmdName = i.pattern.toString().split(/\W+/)[1];
          message.reply(`\`\`\`Command: ${message.prefix}${cmdName.trim()}
Description: ${i.desc}\`\`\``);
        }
      }
    } else {
      let { prefix } = message;
      let [date, time] = new Date()
        .toLocaleString("en-IN", { timeZone: "Africa/Lagos" })
        .split(",");
      let menu = `
     ☬ ʜᴏᴛᴀʀᴏ-ᴍᴅ ☬
   *BY : Tᴀɪʀᴀ Mᴀᴋɪɴᴏ*
 ${readmore}
      `;
      let cmnd = [];
      let cmd;
      let category = [];
      plugins.commands.map((command, num) => {
        if (command.pattern instanceof RegExp) {
          cmd = command.pattern.toString().split(/\W+/)[1];
        }

        if (!command.dontAddCommandList && cmd !== undefined) {
          let type = command.type ? command.type.toLowerCase() : "misc";

          cmnd.push({ cmd, type });

          if (!category.includes(type)) category.push(type);
        }
      });
      cmnd.sort();
      category.sort().forEach((cmmd) => {
        menu += `\n
╭═══════════════ ⪩
╰╮╰┈➤ *${cmmd.toUpperCase()}*
╭═══════════════ ⪩\n`;
        let comad = cmnd.filter(({ type }) => type == cmmd);
        comad.forEach(({ cmd }) => {
          menu += `┃  ${cmd.trim()} \n`;
        });
        menu += `╰════════════════ ⪨`;
      });
      return await message.sendMessage(message.jid,menu);
    }
  }
);
command(
  {
    pattern: "pist",
    fromMe: isPrivate,
    desc: "Show All Commands",
    dontAddCommandList: true,
    type: "user",
  },
  async (message, match) => {
    if (match) {
      for (let i of plugins.commands) {
        if (
          i.pattern instanceof RegExp &&
          i.pattern.test(message.prefix + match)
        ) {
          const cmdName = i.pattern.toString().split(/\W+/)[1];
          message.reply(`\`\`\`Command: ${message.prefix}${cmdName.trim()}
Description: ${i.desc}\`\`\``);
        }
      }
    } else {
      let { prefix } = message;
      let [date, time] = new Date()
        .toLocaleString("en-IN", { timeZone: "Africa/Lagos" })
        .split(",");

      // Stylish menu header
      let menu = `
╭─────── 🌟  *QUEEN ALYA* 🌟 ───────╮
┃  ✦  *BY : STAR KING*  ✦
┃  ✦  *DATE : ${date}*  ✦
┃  ✦  *TIME : ${time}*  ✦
┃  ✦  *TOTAL COMMANDS : ${plugins.commands.length}*  ✦
╰─────────────────────────────╯
      `;

      let cmnd = [];
      let cmd;
      let category = [];

      plugins.commands.map((command) => {
        if (command.pattern instanceof RegExp) {
          cmd = command.pattern.toString().split(/\W+/)[1];
        }

        if (!command.dontAddCommandList && cmd !== undefined) {
          let type = command.type ? command.type.toLowerCase() : "misc";

          cmnd.push({ cmd, type });

          if (!category.includes(type)) category.push(type);
        }
      });

      cmnd.sort();
      category.sort().forEach((cmmd) => {
        menu += `
╭─────────── ⪩  *${cmmd.toUpperCase()}*  ⪨ ───────────╮`;
        let comad = cmnd.filter(({ type }) => type == cmmd);
        comad.forEach(({ cmd }) => {
          menu += `\n┃  ➤ ${cmd.trim()}`;
        });
        menu += `\n╰───────────────────────────╯`;
      });

      // Adding the channel link at the base of the menu
      menu += `
╭─────── 📢 Join Our Channel 📢 ───────╮
┃  👉  https://whatsapp.com/channel/0029VaeW5Tw4yltQOYIO5E2D
╰─────────────────────────────╯`;

      // Sending the image along with the menu caption
      const imageUrl = "https://i.imgur.com/QfDM014.jpeg"; // Image URL
      await message.sendMessage(message.jid, imageUrl, { caption: menu }, "image");
    }
  }
);
command(
{
      pattern: "find ?(.*)",
      fromMe: isPrivate,
      desc: "Finds music name using AI",
      type: 'tools'
  }, async (message, match) => {
      if (!message.reply_message?.audio) return await message.reply("_Reply to a short song")
      if (message.reply_message.duration > 60) return await message.send("_Audio should not be more than 20 seconds_")
      var audio = await message.reply_message.download('buffer');
      var data = await findMusic(audio)
      if (!data) return await message.reply("_No results found!_");
var buttons = [];
function getDuration(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}
const Message = {
    text:  `
    *☬ ʜᴏᴛᴀʀᴏ-ᴍᴅ ☬ Song Finder*
*Title:* ${data.title}\n
Artists: ${data.artists?.map(e => e.name + " ")}\n
Released on: ${data.release_date}\n
Duration: ${getDuration(data.duration_ms)}\n
Album: ${data.album?.name}\n
Genres: ${data.genres?.map(e => e.name + " ")}\n
Label: ${data.label}\n
Spotify: ${"spotify" in data.external_metadata?"Available":"Unavailable"}\n
YouTube: ${"youtube" in data.external_metadata?"https://youtu.be/"+data.external_metadata.youtube.vid:"Unavailable"}\n`,
//    footer: '🎼 Listen to full music on',
//    buttons,
//    headerType:1
}
await message.sendMessage(message.jid, Message)
    });

command(
{
    pattern: 'edit ?(.*)',
    fromMe: true,
    desc: 'edit messages',
    type: "tools"
}, (async (message, match, m, client) => {
    if (match[1] && message.reply_message?.text && message.quoted.key.fromMe){                  
    await client.edit(match[1],message.jid,message.quoted.key);
}                                                                           
}));



