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


const { command, isPrivate } = require("../lib/");
const { isAdmin, parsedJid } = require("../lib");
const config = require("../config");
command(
  {
    pattern: "add",
    fromMe: true,
    desc: "add a person to group",
    type: "group",
  },
  async (message, match) => {
    if (!message.isGroup)
      return await message.reply("_This command is for groups only._");

    match = match || message.reply_message.jid;
    if (!match) return await message.reply("_Mention a user to add");

    const isadmin = await isAdmin(message.jid, message.user, message.client);

    if (!isadmin) return await message.reply("_Make me admin to use this command 😌📍_");
    const jid = parsedJid(match);

    await message.client.groupParticipantsUpdate(message.jid, jid, "add");

    return await message.reply(`_@${jid[0].split("@")[0]} added_`, {
      mentions: [jid],
    });
  }
);

command(
  {
    pattern: "kick",
    fromMe: true,
    desc: "kicks a person from group",
    type: "group",
  },
  async (message, match) => {
    if (!message.isGroup)
      return await message.reply("_This command is for groups only._");

    match = match || message.reply_message.jid;
    if (!match) return await message.reply("_Mention user to kick_");

    const isadmin = await isAdmin(message.jid, message.user, message.client);

    if (!isadmin) return await message.reply("_Make me admin to use this command 😌📍_");
    const jid = parsedJid(match);

    await message.client.groupParticipantsUpdate(message.jid, jid, "remove");

    return await message.reply(`_@${jid[0].split("@")[0]} kicked_`, {
      mentions: [jid],
    });
  }
);
command(
  {
    pattern: "promote",
    fromMe: true,
    desc: "promote to admin",
    type: "group",
  },
  async (message, match) => {
    if (!message.isGroup)
      return await message.reply("_This command is for groups_");

    match = match || message.reply_message.jid;
    if (!match) return await message.reply("_Mention user to promote_");

    const isadmin = await isAdmin(message.jid, message.user, message.client);

    if (!isadmin) return await message.reply("_Make me admin to use this command 😌📍_");
    const jid = parsedJid(match);

    await message.client.groupParticipantsUpdate(message.jid, jid, "promote");

    return await message.reply(`_@${jid[0].split("@")[0]} promoted as admin_`, {
      mentions: [jid],
    });
  }
);
command(
  {
    pattern: "demote",
    fromMe: true,
    desc: "demote from admin",
    type: "group",
  },
  async (message, match) => {
    if (!message.isGroup)
      return await message.reply("_This command is for groups_");

    match = match || message.reply_message.jid;
    if (!match) return await message.reply("_Mention user to demote_");

    const isadmin = await isAdmin(message.jid, message.user, message.client);

    if (!isadmin) return await message.reply("_Make me admin to use this command 😌📍_");
    const jid = parsedJid(match);

    await message.client.groupParticipantsUpdate(message.jid, jid, "demote");

    return await message.reply(
      `_@${jid[0].split("@")[0]} demoted from admin_`,
      {
        mentions: [jid],
      }
    );
  }
);

command(
  {
    pattern: "mute",
    fromMe: true,
    desc: "nute group",
    type: "group",
  },
  async (message, match, m, client) => {
    if (!message.isGroup)
      return await message.reply("_This command is for groups_");
    if (!isAdmin(message.jid, message.user, message.client))
      return await message.reply("_Make me admin to use this command 😌📍_");
    await message.reply(`_Group chat muted_\n\n☬ ʜᴏᴛᴀʀᴏ-ᴍᴅ ☬`);
    return await client.groupSettingUpdate(message.jid, "announcement");
  }
);

command(
  {
    pattern: "unmute",
    fromMe: true,
    desc: "unmute group",
    type: "group",
  },
  async (message, match, m, client) => {
    if (!message.isGroup)
      return await message.reply("_This command is for groups_");
    if (!isAdmin(message.jid, message.user, message.client))
      return await message.reply("_Make me admin to use this command 😌📍_");
    await message.reply(`_Group chat unmuted_\n\n☬ ʜᴏᴛᴀʀᴏ-ᴍᴅ ☬`);
    return await client.groupSettingUpdate(message.jid, "not_announcement");
  }
);

command(
  {
    pattern: "gjid",
    fromMe: true,
    desc: "gets jid of all group members",
    type: "group",
  },
  async (message, match, m, client) => {
    if (!message.isGroup)
      return await message.reply("_This command is for groups only._");
    let { participants } = await client.groupMetadata(message.jid);
    let participant = participants.map((u) => u.id);
    let str = "╭──〔 *Group Jids* 〕\n";
    participant.forEach((result) => {
      str += `➫ *${result}*\n`;
    });
    str += `╰──────────────`;
    message.reply(str);
  }
);

/*command(
  {
    pattern: "tagall",
    fromMe: true,
    desc: "mention all users in group",
    type: "group",
  },
  async (message, match) => {
    if (!message.isGroup) return;
    const { participants } = await message.client.groupMetadata(message.jid);
    let teks = "";
    for (let mem of participants) {
      teks += ` @${mem.id.split("@")[0]}\n`;
    }
    message.sendMessage(message.jid,teks.trim(), {
      mentions: participants.map((a) => a.id),
    });
  }
);*/

/*command(
  {
    pattern: "tag",
    fromMe: true,
    desc: "mention all users in group",
    type: "group",
  },
  async (message, match) => {
    console.log("match")
    match = match || message.reply_message.text;
    if (!match) return message.reply("_Enter or reply to a text to tag_");
    if (!message.isGroup) return;
    const { participants } = await message.client.groupMetadata(message.jid);
    message.sendMessage(message.jid,match, {
      mentions: participants.map((a) => a.id),
    });
  }
);*/


command(
{
        pattern: "tagall",
        fromMe: true,
        desc: "Tags every person of group.",
        type: "group"
    },async(message, match ) => {                                                                                                                 
    if (!message.isGroup) return await message.reply("tag is a group command lol");
        const groupMetadata = await message.groupMetadata(message.jid);
        const participants = message.isGroup ? await groupMetadata.participants : "";
        //const groupAdmins = await getAdmin(Void, citel)
        //const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
        //if (!isAdmins) return citel.reply(tlang().admin);

        let textt = `
══✪〖 *ʜᴏᴛᴀʀᴏ-ᴍᴅ TagAll* 〗✪══

➲ *Message :* ${match ? match : "blank"}\n\n
➲ *Author:* ${config.OWNER_NAME} ♕
➲ *Bot_Name:* *☬ ʜᴏᴛᴀʀᴏ-ᴍᴅ ☬*
`
        for (let mem of participants) {
            textt += `🎊 @${mem.id.split("@")[0]}\n`;
             }
        await message.sendMessage(message.jid, {
            text: textt,
            mentions: participants.map((a) => a.id),
        });
    }
)


/*command(
{
            pattern: "tag",                                                                                                                                                                   
            fromMe: true,
            desc: "Tags every participants in a group chat.",
            type: "group",
        }, async(message, match, m) => {
        if(!m && !m.quoted) return message.reply('*`Example : .tag Hi <Text here>`*')
            if(!m){text = m.quoted.text;}
            if (!message.isGroup) {return message.reply("This is only a group command"); }
            const groupMetadata = message.isGroup ? await message.groupMetadata(message.jid);
            const participants = message.isGroup ? await groupMetadata.participants : "";
            //const groupAdmins = await getAdmin(Void, citel)
            //const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
            //if (!isAdmins && !isCreator) return citel.reply(tlang().admin);
            message.sendMessage(message.jid, { text: text, mentions: participants.map((a) => a.id)});
        }
    )*/
    //---------------------------------------------------------------------------
