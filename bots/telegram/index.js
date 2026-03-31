const { Telegraf } = require('telegraf');
require('dotenv').config();

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

// Start command
bot.start((ctx) => {
  ctx.reply('Welcome to ekaaleAI! 🤖');
});

// Help command
bot.help((ctx) => {
  ctx.reply('Available commands:\n/start - Start the bot\n/help - Show this message');
});

// Launch bot
bot.launch();

console.log('Telegram bot started...');

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

module.exports = bot;