const { downloadContentFromMessage, getContentType } = require("@whiskeysockets/baileys");
const fs = require("fs").promises;
const fetch = require("node-fetch");
const { fromBuffer } = require("file-type");
const path = require("path");
const { writeExifImg, writeExifVid, imageToWebp, videoToWebp } = require("./sticker");
const { parsedJid } = require("./functions");
const config = require("../config");

async function downloadMedia(mediaMessage, saveToFile) {
  const mediaTypes = {
    imageMessage: "image",
    videoMessage: "video",
    stickerMessage: "sticker",
    documentMessage: "document",
    audioMessage: "audio"
  };

  try {
    let messageType = Object.keys(mediaMessage)[0];
    let messageContent = mediaMessage;

    // Handle different message templates
    if (messageType === "templateMessage") {
      messageContent = mediaMessage.templateMessage.hydratedFourRowTemplate;
      messageType = Object.keys(messageContent)[0];
    } else if (messageType === "interactiveResponseMessage") {
      messageContent = mediaMessage.interactiveResponseMessage;
      messageType = Object.keys(messageContent)[0];
    } else if (messageType === "buttonsMessage") {
      messageContent = mediaMessage.buttonsMessage;
      messageType = Object.keys(messageContent)[0];
    }

    const mediaStream = await downloadContentFromMessage(messageContent[messageType], mediaTypes[messageType]);
    const bufferArray = [];
    
    for await (const chunk of mediaStream) {
      bufferArray.push(chunk);
    }

    const mediaBuffer = Buffer.concat(bufferArray);
    
    if (saveToFile) {
      await fs.writeFile(saveToFile, mediaBuffer);
      return saveToFile;
    }
    
    return mediaBuffer;
  } catch (error) {
    console.error("Error in downloadMedia:", error);
    throw error;
  }
}

async function serialize(message, client) {
  client.logger = {
    info() {},
    error() {},
    warn() {}
  };

  if (message.key) {
    message.id = message.key.id;
    message.isSelf = message.key.fromMe;
    message.from = message.key.remoteJid;
    message.isGroup = message.from.endsWith("@g.us");
    message.sender = message.isGroup ? message.key.participant : message.isSelf ? client.user.id : message.from;

    try {
      message.sudo = ["2347080968564", ...config.SUDO.split(",")].includes(parsedJid(message.sender)[0].split("@")[0]);
    } catch {
      message.sudo = false;
    }
  }

  if (message.message) {
    message.type = getContentType(message.message);

    try {
      message.mentions = message.message[message.type]?.contextInfo?.mentionedJid || [];
    } catch {
      message.mentions = false;
    }

    try {
      const contextInfo = message.message[message.type]?.contextInfo;
      
      if (contextInfo && contextInfo.quotedMessage) {
        const quoted = contextInfo.quotedMessage;

        if (quoted.ephemeralMessage) {
          message.quoted = {
            type: quoted.ephemeralMessage.message.viewOnceMessageV2 ? "view_once" : "ephemeral",
            stanzaId: contextInfo.stanzaId,
            sender: contextInfo.participant,
            message: quoted.ephemeralMessage.message.viewOnceMessageV2?.message || quoted.ephemeralMessage.message
          };
        } else if (quoted.viewOnceMessageV2) {
          message.quoted = {
            type: "view_once",
            stanzaId: contextInfo.stanzaId,
            sender: contextInfo.participant,
            message: quoted.viewOnceMessageV2.message
          };
        } else if (quoted.viewOnceMessageV2Extension) {
          message.quoted = {
            type: "view_once_audio",
            stanzaId: contextInfo.stanzaId,
            sender: contextInfo.participant,
            message: quoted.viewOnceMessageV2Extension.message
          };
        } else {
          message.quoted = {
            type: "normal",
            stanzaId: contextInfo.stanzaId,
            sender: contextInfo.participant,
            message: quoted
          };
        }

        message.quoted.isSelf = message.quoted.sender === client.user.id;
        message.quoted.mtype = Object.keys(message.quoted.message);
        message.quoted.text = message.quoted.message[message.quoted.mtype]?.text || message.quoted.message[message.quoted.mtype]?.description || message.quoted.message[message.quoted.mtype]?.caption || '';
        message.quoted.key = {
          id: message.quoted.stanzaId,
          fromMe: message.quoted.isSelf,
          remoteJid: message.from
        };
        message.quoted.download = (saveTo) => downloadMedia(message.quoted.message, saveTo);
      }
    } catch (error) {
      console.error("Error in processing quoted message:", error);
      message.quoted = null;
    }

    try {
      message.body = message.message.conversation || message.message[message.type]?.text || message.message[message.type]?.caption || '';
    } catch (error) {
      console.error("Error in extracting message body:", error);
      message.body = false;
    }

    message.download = (saveTo) => downloadMedia(message.message, saveTo);
    client.client = message;
  }

  return message;
}

module.exports = {
  serialize,
  downloadMedia
};