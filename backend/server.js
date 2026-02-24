require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TelegramBot = require('node-telegram-bot-api');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Atlas Connection (Using .env or direct fallback)
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://admin:Magic@cluster0.uakdovp.mongodb.net/Trade?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB Atlas Connected Successfully'))
  .catch((err) => console.error('❌ MongoDB Atlas Connection Error:', err));

// User Schema (Updated with Balance)
const userSchema = new mongoose.Schema({
  telegramId: { type: String, unique: true },
  username: String,
  firstName: String,
  balance: { type: Number, default: 0 }, // New field added here
  joinedAt: { type: Date, default: Date.now }
});
const User = mongoose.model('User', userSchema);

// Login API Route
app.post('/api/login', async (req, res) => {
  const { telegramId, username, firstName } = req.body;
  try {
    let user = await User.findOne({ telegramId });
    if (!user) {
      // Create new user with 0 balance if they don't exist
      user = new User({ telegramId, username, firstName, balance: 0 });
      await user.save();
    }
    // Send the user data (including balance) back to the frontend
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