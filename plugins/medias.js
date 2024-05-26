const { command, isPrivate, serialize } = require("../lib");
const fs = require("fs");
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
