/**
 * Configuration variables and environment setup
 * Centralized configuration management
 */

require('dotenv').config();

module.exports = {
  // Server
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',

  // Database
  databaseUri: process.env.DATABASE_URI || 'mongodb://localhost:27017/mah',
  databaseName: process.env.DATABASE_NAME || 'mah',

  // JWT
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
  jwtExpiration: process.env.JWT_EXPIRATION || '7d',

  // External Services
  mpesaApiKey: process.env.MPESA_API_KEY,
  mpesaApiSecret: process.env.MPESA_API_SECRET,
  twilioAccountSid: process.env.TWILIO_ACCOUNT_SID,
  twilioAuthToken: process.env.TWILIO_AUTH_TOKEN,
  twilioPhoneNumber: process.env.TWILIO_PHONE_NUMBER,
  telegramBotToken: process.env.TELEGRAM_BOT_TOKEN,
  discordBotToken: process.env.DISCORD_BOT_TOKEN,

  // Referral System
  maxReferralGenerations: process.env.MAX_REFERRAL_GENERATIONS || 10,
  referralRewardPercentage: process.env.REFERRAL_REWARD_PERCENTAGE || 0.05, // 5%

  // Email
  emailServiceProvider: process.env.EMAIL_SERVICE_PROVIDER || 'smtp',
  emailFromAddress: process.env.EMAIL_FROM_ADDRESS || 'noreply@mah.com',
  smtpHost: process.env.SMTP_HOST,
  smtpPort: process.env.SMTP_PORT,
  smtpUser: process.env.SMTP_USER,
  smtpPassword: process.env.SMTP_PASSWORD,

  // Logging
  logLevel: process.env.LOG_LEVEL || 'info',
  logFormat: process.env.LOG_FORMAT || 'json',
};