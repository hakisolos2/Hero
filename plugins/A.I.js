const { command, isPrivate } = require("../lib/");
const axios = require("axios");
const fetch = require("node-fetch");

command(
  {
    pattern: "bing",
    fromMe: isPrivate,
    desc: "Ask bing anything.",
    type: "ai",
  },
  async (message, match) => {
    try {
      // Extract the query from the message
      const query = match ? match.trim() : null;
      if (!query) {
        return await message.reply("Please provide a query, e.g., `.bing What is life?`.");
      }

      // Define the API URL
      const apiUrl = `https://itzpire.com/ai/bing-ai?model=Precise&q=${encodeURIComponent(query)}`;
      const response = await fetch(apiUrl);

      // Check if the API response is successful
      if (!response.ok) {
        return await message.reply(`*_Error: ${response.status} ${response.statusText}_*`);
      }

      // Get the result from the API response
      const data = await response.json();
      const resultText = data.result; // Extract the result

      // Send the final response
      await message.reply(`*Response:* \n\n${resultText}`);
    } catch (error) {
      // Handle any errors
      await message.reply(`Failed to get a response. Error: ${error.message}`);
      console.error("Error fetching AI response:", error);
    }
  }
);
command(
  {
    pattern: "gpt",
    fromMe: isPrivate,
    desc: "Ask Gpt anything.",
    type: "ai",
  },
  async (message, match) => {
    try {
      // Extract the query from the message
      const query = match ? match.trim() : null;
      if (!query) {
        return await message.reply("Please provide a query, e.g., `.gpt What is life?`.");
      }

      // Define the API URL
      const apiUrl = `https://widipe.com/gpt4?text=${encodeURIComponent(query)}`;
      const response = await fetch(apiUrl);

      // Check if the API response is successful
      if (!response.ok) {
        return await message.reply(`*_Error: ${response.status} ${response.statusText}_*`);
      }

      // Get the result from the API response
      const data = await response.json();
      const resultText = data.result; // Extract the result

      // Send the final response
      await message.reply(`*Response:* \n\n${resultText}`);
    } catch (error) {
      // Handle any errors
      await message.reply(`Failed to get a response. Error: ${error.message}`);
      console.error("Error fetching AI response:", error);
    }
  }
);
command(
  {
    pattern: "gemini",
    fromMe: isPrivate,
    desc: "Ask Gemini anything.",
    type: "ai",
  },
  async (message, match) => {
    try {
      // Extract the query from the message
      const query = match ? match.trim() : null;
      if (!query) {
        return await message.reply("Please provide a query, e.g., `.gemini What is life?`.");
      }

      // Define the API URL
      const apiUrl = `https://widipe.com/gemini?text=${encodeURIComponent(query)}`;
      const response = await fetch(apiUrl);

      // Check if the API response is successful
      if (!response.ok) {
        return await message.reply(`*_Error: ${response.status} ${response.statusText}_*`);
      }

      // Get the result from the API response
      const data = await response.json();
      const resultText = data.result; // Extract the result

      // Send the final response
      await message.reply(`*Response:* \n\n${resultText}`);
    } catch (error) {
      // Handle any errors
      await message.reply(`Failed to get a response. Error: ${error.message}`);
      console.error("Error fetching AI response:", error);
    }
  }
);
command(
  {
    pattern: "lumina",
    fromMe: isPrivate,
    desc: "Ask Lumina anything.",
    type: "ai",
  },
  async (message, match) => {
    try {
      // Extract the query from the message
      const query = match ? match.trim() : null;
      if (!query) {
        return await message.reply("Please provide a query, e.g., `.lumina What is life?`.");
      }

      // Define the API URL
      const apiUrl = `https://widipe.com/v3/gpt4?text=${encodeURIComponent(query)}`;
      const response = await fetch(apiUrl);

      // Check if the API response is successful
      if (!response.ok) {
        return await message.reply(`*_Error: ${response.status} ${response.statusText}_*`);
      }

      // Get the result from the API response
      const data = await response.json();
      const resultText = data.result; // Extract the result

      // Send the final response
      await message.reply(`*Response:* \n\n${resultText}`);
    } catch (error) {
      // Handle any errors
      await message.reply(`Failed to get a response. Error: ${error.message}`);
      console.error("Error fetching AI response:", error);
    }
  }
);
command(
  {
    pattern: "simi",
    fromMe: isPrivate,
    desc: "Ask Simi anything.",
    type: "ai",
  },
  async (message, match) => {
    try {
      // Extract the query from the message
      const query = match ? match.trim() : null;
      if (!query) {
        return await message.reply("Please provide a query, e.g., `.Simi What is life?`.");
      }

      // Define the API URL
      const apiUrl = `https://widipe.com/simi?text=${encodeURIComponent(query)}`;
      const response = await fetch(apiUrl);

      // Check if the API response is successful
      if (!response.ok) {
        return await message.reply(`*_Error: ${response.status} ${response.statusText}_*`);
      }

      // Get the result from the API response
      const data = await response.json();
      const resultText = data.result; // Extract the result

      // Send the final response
      await message.reply(`*Response:* \n\n${resultText}`);
    } catch (error) {
      // Handle any errors
      await message.reply(`Failed to get a response. Error: ${error.message}`);
      console.error("Error fetching AI response:", error);
    }
  }
);
