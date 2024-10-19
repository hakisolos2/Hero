const { command, isPrivate } = require("../lib/");
const { removeBg } = require("../lib/functions");
const config = require("../config");
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
command(
  {
    pattern: "rmbg",
    fromMe: isPrivate,
    desc: "Remove background of an image",
    type: "image",
  },
  async (message, match, m) => {
    if (!config.REMOVEBG)
      return await message.sendMessage(
        message.jid,
        "Set RemoveBg API Key in config.js \n Get it from https://www.remove.bg/api"
      );
    if (!message.reply_message && !message.reply_message.image)
        
      return await message.reply("Reply to an image");
    let buff = await m.quoted.download();
    let buffer = await removeBg(buff);
    if (!buffer) return await message.reply("An error occured");
    await message.sendMessage(
      message.jid,
      buffer,
      {
        quoted: message.reply_message.key,
        mimetype: "image/png",
        fileName: "removebg.png",
      },
      "document"
    );
  }
);
command(
  {
    pattern: "upload",
    fromMe: isPrivate,
    desc: "Upload image, video, or audio to widipe API and get a URL",
    type: "media",
  },
  async (message, match, m) => {
    if (!message.reply_message || (!message.reply_message.image && !message.reply_message.video && !message.reply_message.audio)) {
      return await message.reply("Reply to an image, video, or audio to upload.");
    }

    // Download the media from the quoted message
    let mediaBuffer = await m.quoted.download();

    // Prepare the form data
    let form = new FormData();
    form.append("file", mediaBuffer, {
      filename: message.reply_message.fileName || "upload",
      contentType: message.reply_message.mimetype,
    });

    try {
      // Send a POST request to the API
      let response = await axios.post("https://widipe.com/api/upload.php", form, {
        headers: {
          ...form.getHeaders(),
        },
      });

      // Extract the URL from the API response
      let { status, result } = response.data;
      if (status && result && result.url) {
        await message.reply(`Uploaded successfully! Here is your URL: ${result.url}`);
      } else {
        await message.reply("Failed to upload the file.");
      }
    } catch (error) {
      console.error(error);
      await message.reply("An error occurred while uploading.");
    }
  }
);