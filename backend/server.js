require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TelegramBot = require('node-telegram-bot-api');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/tradeDB');

// User Schema
const userSchema = new mongoose.Schema({
  telegramId: { type: String, unique: true },
  username: String,
  firstName: String,
  joinedAt: { type: Date, default: Date.now }
});
const User = mongoose.model('User', userSchema);

// Login API Route
app.post('/api/login', async (req, res) => {
  const { telegramId, username, firstName } = req.body;
  try {
    let user = await User.findOne({ telegramId });
    if (!user) {
      user = new User({ telegramId, username, firstName });
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

app.listen(process.env.PORT || 5000, () => console.log("Server running..."));