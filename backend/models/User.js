const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // Basic Info
  telegramId: { type: String, unique: true },
  username: String,
  firstName: String,

  // Main Wallets (Screenshot ke hisaab se)
  balance: { type: Number, default: 0 },         // Deposit balance (For buying TP)
  totalEarned: { type: Number, default: 0 },     // Top-left "You Earned"
  
  // AiEarn / Trade Power System
  tradePower: { type: Number, default: 0 },      // Center "TP (Trade Power) 0.5"
  dailyEarn: { type: Number, default: 0 },       // Us TP se kitna daily aayega
  lastSettlement: { type: Date, default: null }, // Countdown timer calculate karne ke liye
  
  // Refer & Earn System
  referralCode: { type: String, unique: true },  // User ka apna invite code
  referredBy: { type: String, default: null },   // Is user ko kisne invite kiya
  teamIncome: { type: Number, default: 0 },      // Doston se aane wali income

  joinedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);