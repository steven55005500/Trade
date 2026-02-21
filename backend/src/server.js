require('dotenv').config();
const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const path = require('path');
const connectDB = require('./config/db');
const User = require('./models/User');

const app = express();
const port = process.env.PORT || 3000;

// 1️⃣ Database Connection
connectDB();

// 2️⃣ Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// 3️⃣ Telegram Bot Setup (Polling Mode)
const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

// Start Command Logic
bot.onText(/\/start ?(.+)?/, async (msg, match) => {
    const chatId = msg.chat.id;
    const { id, first_name, username } = msg.from;
    const referrerId = match[1] ? match[1].trim() : null;
    const webAppUrl = process.env.DOMAIN_URL;

    console.log(`Start from ${id}, Referrer: ${referrerId}`);

    try {
        let user = await User.findOne({ telegramId: id });

        if (!user) {
            let parentId = null;

            if (referrerId && referrerId != id) {
                const referrer = await User.findOne({ telegramId: referrerId });

                if (referrer) {
                    parentId = referrerId;
                    await User.updateOne(
                        { telegramId: referrerId },
                        { $inc: { referrals: 1 } }
                    );
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

        bot.sendMessage(chatId, "Welcome to Elite Infinity 🚀", {
            reply_markup: {
                inline_keyboard: [[
                    { text: "🚀 Open Dashboard", web_app: { url: webAppUrl } }
                ]]
            }
        });

    } catch (err) {
        console.error("Referral Error:", err);
    }
});

// 4️⃣ Mini App Auth API
app.post('/api/auth', async (req, res) => {
    try {
        const userData = req.body;

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
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});