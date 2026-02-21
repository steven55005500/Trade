require('dotenv').config();
const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const path = require('path');
const connectDB = require('./config/db.js'); // Database connection
const User = require('./models/User.js');    // User Model

const app = express();
const port = process.env.PORT || 3000;

// 1. Database Connect Karein
connectDB();

// 2. Middleware
app.use(express.json()); // Frontend se aane wale JSON data ko samajhne ke liye
app.use(express.static(path.join(__dirname, 'public')));

// 3. Telegram Bot Setup
const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

// /start command handle karna
bot.onText(/\/start (.+)?/, async (msg, match) => {
    const chatId = msg.chat.id;
    const { id, first_name, username } = msg.from;
    const referrerId = match[1]; // Ye link se aane wali referral ID hai
    const webAppUrl = process.env.DOMAIN_URL;

    try {
        let user = await User.findOne({ telegramId: id });

        if (!user) {
            // Naya user hai, check karo kisne refer kiya
            let parentId = null;
            if (referrerId && referrerId != id) {
                const referrer = await User.findOne({ telegramId: referrerId });
                if (referrer) {
                    parentId = referrerId;
                    // Referrer ka count +1 karo
                    await User.updateOne({ telegramId: referrerId }, { $inc: { referrals: 1 } });
                    console.log(`${first_name} joined under ${referrer.firstName}`);
                }
            }

            user = new User({
                telegramId: id,
                firstName: first_name,
                username: username || '',
                referredBy: parentId
            });
            await user.save();
        }
    } catch (err) {
        console.error("Referral Error:", err);
    }

    bot.sendMessage(chatId, `Welcome to Elite Infinity!`, {
        reply_markup: {
            inline_keyboard: [[
                { text: "🚀 Open Dashboard", web_app: { url: webAppUrl } }
            ]]
        }
    });
});

// 4. API: Mini App Login/Auth
// Jab Mini App khulega, toh ye API user ka data DB me update/check karegi
app.post('/api/auth', async (req, res) => {
    const userData = req.body; // Telegram Mini App se aane wala data

    try {
        let user = await User.findOne({ telegramId: userData.id });

        if (!user) {
            user = new User({
                telegramId: userData.id,
                firstName: userData.first_name,
                username: userData.username || ''
            });
            await user.save();
        }

        res.status(200).json({ success: true, user });
    } catch (error) {
        console.error('API Auth Error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Basic route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});