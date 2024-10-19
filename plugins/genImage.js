const { command, isPrivate } = require("../lib/");
const fetch = require('node-fetch'); // Ensure node-fetch is installed

command(
  {
    pattern: "genimage",
    fromMe: isPrivate,
    desc: "Generate image from text",
    type: "image",
  },
  async (message, match) => {
    match = match || message.reply_message.text;
    if (!match) return await message.sendMessage(message.jid, "Provide me a text");

    try {
      // Call the API to generate the image from the text
      const apiUrl = `https://widipe.com/v1/text2img?text=${encodeURIComponent(match)}`;
      
      // Fetch the response from the API
      const response = await fetch(apiUrl);

      // Check for a successful response
      if (!response.ok) {
        return await message.sendMessage(message.jid, `Error: ${response.status} ${response.statusText}`);
      }

      // Get the content type of the response
      const contentType = response.headers.get('content-type');

      if (contentType && contentType.startsWith('image')) {
        // If the response is an image, send it directly
        const imageBuffer = await response.buffer(); // Get the image as a buffer
        return await message.sendMessage(
          message.jid,
          imageBuffer,
          {
            mimetype: "image/jpeg",
            caption: "𝐍𝐄𝐗𝐔𝐒-𝐁𝐎𝐓 Image Generated",
          },
          "image"
        );
      } else if (contentType && contentType.includes('application/json')) {
        // If the response is JSON, parse it and get the image URL
        const data = await response.json();
        if (data.status !== 200) {
          return await message.sendMessage(message.jid, "An error occurred while fetching the data.");
        }

        const photoUrl = data.result;

        // Send the photo URL to the user
        return await message.sendMessage(
          message.jid,
          { url: photoUrl },
          {
            mimetype: "image/jpeg",
            caption: "𝐍𝐄𝐗𝐔𝐒-𝐁𝐎𝐓 Image Generated",
          },
          "image"
        );
      } else {
        // Handle unexpected content types
        return await message.sendMessage(message.jid, "Unexpected content type received from the API.");
      }
    } catch (error) {
      console.error(error);
      return await message.sendMessage(message.jid, "Failed to generate image.");
    }
  }
);