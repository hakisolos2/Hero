const googleTTS = require("google-tts-api");
const { command, isPrivate, serialize } = require("../lib")
const axios = require("axios")
const util = require("util")


command({ pattern: "tts", fromMe: isPrivate, desc: "text to speech.", type: "misc"},
        async(message, match) => { if (!match) { return message.reply('Please give me a Sentence to change into audio.')}
            let texttts = match
            const ttsurl = googleTTS.getAudioUrl(texttts, { lang: "en", slow: false, host: "https://translate.google.com" });
            return await message.sendMessage(message.jid, { audio: { url: ttsurl
            },
                mimetype: "audio/mpeg", fileName: `hotarotts.m4a`,
            }, {
                quoted: message,
            })
            await fs.unlinkSync("./hotarotts.m4a");
        }
    );

command({ pattern: "wa", fromMe: isPrivate, desc: "Makes wa.me of quoted or mentioned user.",
             type: "misc"
         },
         async(message, match) => { let users = match || message.reply_message.jid
         const jid = parsedJid(match);
            return message.reply(`https://wa.me/${jid[0].split("@")[0]}`)
         }
     );

ommand({ pattern: "repo", fromMe: isPrivate, desc: "Sends info about repo.", type: "user",
    },
    async(message, match) => { 
    let { data } = await axios.get('https://api.github.com/repos/Anonphoenix007/HOTARO-MD')
    let cap = `*_ʜᴏᴛᴀʀᴏ-ᴍᴅ, a Simple WhatsApp Bot Created By Tᴀɪʀᴀ Mᴀᴋɪɴᴏ_*.
  *_❲❒❳ Stars: ${data.stargazers_count} stars_*
  *_❲❒❳ Forks: *${data.forks_count} forks_*
  *_❲❒❳ Creator: Tᴀɪʀᴀ Mᴀᴋɪɴᴏ ~ https://wa.me/2347080968564_*
  *_❲❒❳ Group_: https://chat.whatsapp.com/BRDE2Yqsj9iAkTxhnuI1AL_*
  *_❲❒❳ Channel: https://whatsapp.com/channel/0029VaY0Zq32P59piTo5rg0K_*
  *_❲❒❳ Repo: https://github.com/anonphoenix007/HOTARO-MD_*
  *_❲❒❳ Scan: https://taira-web-service.onrender.com/qr_*
  *_❲❒❳ Pair: https://taira-web-service.onrender.com/pair_*
  *_❲❒❳ Deploy: https://dashboard.heroku.com/new?template=https://github.com/Anonphoenix007/HOTARO-MD_*

  *©Tᴀɪʀᴀ Mᴀᴋɪɴᴏ*`
         let buttonMessaged = {
         image: { url: "https://telegra.ph/file/0691935a017b74bc2e49b.jpg" },
            caption: cap,
            footer: "☬ ʜᴏᴛᴀʀᴏ-ᴍᴅ ☬",
            headerType: 4,
            contextInfo: {
                externalAdReply: { title: "ʜᴏᴛᴀʀᴏ-ᴍᴅ repo",
                body: "ʜᴏᴛᴀʀᴏ-ᴍᴅ", 
                thumbnail: "https://telegra.ph/file/0691935a017b74bc2e49b.jpg", 
                mediaType: 4,
                mediaUrl: 'https://whatsapp.com/channel/0029VaY0Zq32P59piTo5rg0K',
                sourceUrl: `https://whatsapp.com/channel/0029VaY0Zq32P59piTo5rg0K`,
                },
            },
        };
        return await message.sendMessage(message.jid, buttonMessaged, {
            quoted: message,
        });
    }
)


command({ on: "evall" }, async (message, match} => {
if (message.sudo && message.body.startsWith('>')) { 
let code = match.slice(2) 
if (!code) {
                        await message.reply(`You need to provide a query to run!`);
                        return;
                    }
                    try {
                    let resultTest = eval(match);
                    if (typeof resultTest === "object") {
                            message.reply(util.format(resultTest)); } else
                        message.reply(util.format(resultTest));
                    } catch (err) {
                        await message.reply(util.format(err));
                    }
                    return
                }
                if (message.sudo && message.body.startsWith('$')) {
                let code = match.slice(2)
                if (!code) {
                        await message.reply(`You need to provide a query to run!`); 
                        return;
                    }
                    try { 
                    let resultTest = await eval('const a = async()=>{\n' + code + '\n}\na()');
                    let h = util.format(resultTest);
                      if(h===undefined) { return console.log(h) } else
                        await message.reply(h)
                    } catch (err) {
                      if(err===undefined) { return console.log('error')} else
                    await message.reply(util.format(err));
                    }
                    return
                }
}catch (e) {
                console.log(e)
            }
        })
}
)
