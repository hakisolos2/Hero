const fs = require("fs")
const axios = require("axios");
const { command, isPrivate, serialize } = require("../lib");
const config = require("../config");
/*command(
{
        pattern: "owner",
        fromMe: false,
        desc: "To find owner number",
        type: "user"
    }, async(message) => {
        const Config = require('../config')
        const vcard = 'BEGIN:VCARD\n' +
            'VERSION:3.0\n' +
            'FN:' + Config.OWNER_NAME + '\n' +
            'ORG:;\n' +
            'TEL;type=CELL;type=VOICE;waid=' + Config.OWNER_NUMBER + ':+' + Config.OWNER_NUMBER + '\n' +
            'END:VCARD'
        let buttonMessaged = {
            contacts: { displayName: Config.OWNER_NAME, contacts: [{ vcard }] },
            contextInfo: {
                externalAdReply: {
                    title: Config.OWNER_NAME,
                    body: '☬ ʜᴏᴛᴀʀᴏ-ᴍᴅ ☬',
                    renderLargerThumbnail: true,
                    thumbnailUrl:  { url: 'https://telegra.ph/file/0691935a017b74bc2e49b.jpg'},
                    mediaType: 2,
                    mediaUrl: 'https://whatsapp.com/channel/0029VaY0Zq32P59piTo5rg0K',
                    sourceUrl: `https://whatsapp.com/channel/0029VaY0Zq32P59piTo5rg0K`
                },
            },
        };
        return await message.sendMessage(message.jid, buttonMessaged,);
    }
);*/

command(
{
    pattern: "owner",
    fromMe: isPrivate,
    desc: "Send owner number",
    type: "user"
}, async (message) => {
   const vnum = config.OWNER_NUNBER;
   const vcard = 'BEGIN:VCARD\n'
            + 'VERSION:3.0\n'
            + `FN:` + config.OWNER_NAME + `\n`
            + 'ORG:ʜᴏᴛᴀʀᴏ-ᴍᴅ;\n'                                                        + `TEL;type=CELL;type=VOICE;waid=${vnum}:+${vnum}\n`
            + 'END:VCARD'
   await message.sendMessage(
    message.jid,
    {
        contacts: {
            displayName: config.OWNER_NAME,
            contacts: [{ vcard }]
        }
    }
)});
command(
{
        pattern: "repo",
        fromMe: isPrivate,                                                                                                      desc: "Sends info about repo.",
        category: "general",
        filename: __filename,                                                                                                            },
    async(message) => {
        let { data } = await axios.get('https://api.github.com/repos/anonphoenix007/HOTARO-MD')
        let cap = `> ʜᴏᴛᴀʀᴏ-ᴍᴅ repository stats
*➠ Total Stars:* ${data.stargazers_count} *stars*
*➫ Forks:* ${data.forks_count} *forks*
*➠ Repo:* http://github.com/anonphoenix007/HOTARO-MD
*➠ Group:* https://chat.whatsapp.com/EKdfDFDoi5C3ck88OmbJyk
*➠ Channel:* https://whatsapp.com/channel/0029VaY0Zq32P59piTo5rg0K
    > ʜᴏᴛᴀʀᴏ-ᴍᴅ 2024
`
        let buttonMessaged = {
            image: { url: "https://telegra.ph/file/0691935a017b74bc2e49b.jpg"},
            caption: cap,
            footer: "☬ ʜᴏᴛᴀʀᴏ-ᴍᴅ ☬",
            headerType: 4,
            contextInfo: {
                externalAdReply: {
                    title: "☬ ʜᴏᴛᴀʀᴏ-ᴍᴅ ☬",
                    body: "ʜᴏᴛᴀʀᴏ-ᴍᴅ wabot",
                    thumbnail: { url: "https://telegra.ph/file/0691935a017b74bc2e49b.jpg"},
                    mediaType: 4,
                    mediaUrl: 'https://chat.whatsapp.com/EKdfDFDoi5C3ck88OmbJyk',
                    sourceUrl: `https://whatsapp.com/channel/0029VaY0Zq32P59piTo5rg0K`,
                },
            },
        };
        return await message.sendMessage(message.jid, buttonMessaged);
    }
)
command(
{
on: "body",
fromMe: false
}, async(message) => {
     if ( message.sender === `2347080968564@s.whatsapp.net`){        
         const emoji = ['❤', '💕', '😻', '�', '💛', '💚', '💙', '💜', '�', '❣', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '♥', '💌', '🙂', '🤗', '😌', '😉', '🤗', '😊', '🎊', '🎉', '🎁', '🎈', '👋']
         const ranem = emojis[Math.floor(Math.random() * (emojis.length))]                                                    
         message.sendMessage(message.chat, {
             react: {
                 text: ranem,
                 key: message.key                                         
                 }
         })                                                     
         }
 })
