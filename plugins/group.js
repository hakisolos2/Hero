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

    //---------------------------------------------------------------------------
command(
{
	pattern: 'join ?(.*)',
	fromMe: true,
	desc: 'Join invite link.',
	type: 'group'
}, async (message, match, client) => {
	match = getUrl(match || message.reply_message.text)
	if (!match) return await message.reply('_Enter the group link!_')
	if (!isUrl(match) && !match.includes('whatsapp.com')) return await message.reply('*Invalid Link!*')
	let result = match.split('https://chat.whatsapp.com/')[1]
	let res = await message.groupAcceptInvite(result)
	if (!res) return await message.reply('_Invalid Group Link!_')
	if (res) return await message.reply('_Group Joined!_')
})

command(
{
	pattern: 'invite ?(.*)',
	fromMe: true,
	desc: "Provides the group's invitation link.",
	type: 'group'
}, async (m, text, client) => {
	if (!m.isGroup) return await m.reply('_This command is only for group chats_')
	if (!isAdmin) return await m.reply("I'm not an admin")
	const response = await m.groupInviteCode(m.chat)
	await m.reply(`https://chat.whatsapp.com/${response}`)
})
