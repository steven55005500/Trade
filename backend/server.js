require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TelegramBot = require('node-telegram-bot-api');

// 👉 NAYA: Yahan humne apne naye User model ko import kiya hai
const User = require('./models/User');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Atlas Connection
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB Atlas Connected Successfully'))
  .catch((err) => console.error('❌ MongoDB Atlas Connection Error:', err));

// Login API Route
app.post('/api/login', async (req, res) => {
  const { telegramId, username, firstName } = req.body;
  try {
    let user = await User.findOne({ telegramId });
    if (!user) {
      user = new User({ telegramId, username, firstName, balance: 0 });
      await user.save();
    }
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Bot setup
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Welcome! Click below to login.", {
    reply_markup: {
      inline_keyboard: [[{ text: "Login to Dashboard", web_app: { url: process.env.FRONTEND_URL } }]]
    }
  });
});

app.listen(process.env.PORT || 5000, () => console.log("Server running on port 5000..."));