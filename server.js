require('dotenv').config();
const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Telegram Bot Setup
const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

// Frontend (Dashboard) serve karne ke liye public folder set karna
app.use(express.static(path.join(__dirname, 'public')));

// /start command handle karna
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    // Aapke domain ka URL jahan dashboard host hoga
    const webAppUrl = process.env.DOMAIN_URL; 

    // Bot reply karega ek button ke sath jo Mini App open karega
    bot.sendMessage(chatId, "Welcome to the Dashboard! Niche click karke open karein:", {
        reply_markup: {
            inline_keyboard: [[
                { text: "🚀 Open Dashboard", web_app: { url: webAppUrl } }
            ]]
        }
    });
});

// Basic route check karne ke liye
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});