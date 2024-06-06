const { command, isPrivate, serialize } = require("../lib");
const fs = require("fs");
const { download } from 'aptoide-scraper'; 
/*command({
            pattern: "play",
            fromMe: isPrivate,
            desc: "Sends info about the query(of youtube video/audio).",                             
            type: "downloader",
            use: '<faded-Alan walker.>',
        }, async(message, match) => {
            if (!match) return message.reply(`Use .play Back in Black`);
            let yts = require("secktor-pack");
            let search = await yts(match);
            let anu = search.videos[0];
            let buttonMessage = {
                image: {
                    url: anu.thumbnail,
                },
                caption: `
╭───────────────◆
│⿻ ʜᴏᴛᴀʀᴏ-ᴍᴅ song downloader
│⿻ *Title:* ${anu.title}
│⿻ *Duration:* ${anu.timestamp}
│⿻ *Viewers:* ${anu.views}
│⿻ *Uploaded:* ${anu.ago}
│⿻ *Author:* ${anu.author.name}
╰────────────────◆
⦿ *Url* : ${anu.url}

> ʜᴏᴛᴀʀᴏ-ᴍᴅ downloader
`,
                footer: "☬ ʜᴏᴛᴀʀᴏ-ᴍᴅ ☬",
                headerType: 4,
            };
            return message.sendMessage(message.jid, buttonMessage);
        }
        );*/

command(
{
   pattern: "apk",
   fromMe: isPrivate,
   desc: "apk and mod apk download",
   use: "downloader"
}, async(message, match, m, client) => {   
  try {
      if (!match) return message.reply('*Please provide the APK Name to download.*')
      await message.sendMessage(message.jid, {text: `*Downloading ${match}*`})
      let data = await download(match);

      if (data.size.replace(' MB', '') > 200) {
        return await mesage.sendMessage(message.jid, { text: '*The file is too large,Cannot send.*' }, { quoted: message });
      }

      if (data.size.includes('GB')) {
        return await message.sendMessage(message.jid, { text: '*The file is too large,cannot send..*' }, { quoted: message });
      }
      await message.sendMessage(
        message.jid,
        { document: { url: data.dllink }, mimetype: 'application/vnd.android.package-archive', fileName: data.name + '.apk', caption: null },
        { quoted: message }
      )
    }
  } catch {
    await message.reply(`*Download error occured.*`);
  }
};
