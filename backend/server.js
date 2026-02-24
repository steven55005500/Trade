require('dotenv').config(); // This loads the .env file
const express = require('express');
const cors = require('cors');
const TelegramBot = require('node-telegram-bot-api');

// Get variables from the .env file
const token = process.env.TELEGRAM_BOT_TOKEN; 
const frontendUrl = process.env.FRONTEND_URL; 
const port = process.env.PORT || 5000;

const bot = new TelegramBot(token, { polling: true });
const app = express();

app.use(cors());
app.use(express.json());

// When someone presses Start, send the login Web App
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  
  bot.sendMessage(chatId, "Welcome! Please log in to continue.", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Open Login Page", web_app: { url: frontendUrl } }]
      ]
    }
  });
});

app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});