const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    telegramId: { type: String, required: true, unique: true },
    firstName: { type: String },
    username: { type: String },
    referredBy: { type: String, default: null }, // Kisne refer kiya uski ID
    referrals: { type: Number, default: 0 },    // Kitne log join karwaye
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);