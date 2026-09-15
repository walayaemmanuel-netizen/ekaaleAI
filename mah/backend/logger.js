/**
 * Logging utility
 * Provides consistent logging across the application
 */

const config = require('./config');

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

const colors = {
  error: '\x1b[31m', // Red
  warn: '\x1b[33m', // Yellow
  info: '\x1b[36m', // Cyan
  debug: '\x1b[35m', // Magenta
  reset: '\x1b[0m', // Reset
};

const currentLevel = levels[config.logLevel] || levels.info;

const formatMessage = (level, message, data = null) => {
  const timestamp = new Date().toISOString();
  const color = colors[level];
  const reset = colors.reset;

  if (config.logFormat === 'json') {
    return JSON.stringify({
      timestamp,
      level,
      message,
      data,
    });
  }

  const dataStr = data ? ` ${JSON.stringify(data)}` : '';
  return `${color}[${timestamp}] [${level.toUpperCase()}]${reset} ${message}${dataStr}`;
};

const log = (level, message, data = null) => {
  if (levels[level] <= currentLevel) {
    console.log(formatMessage(level, message, data));
  }
};

module.exports = {
  error: (message, data) => log('error', message, data),
  warn: (message, data) => log('warn', message, data),
  info: (message, data) => log('info', message, data),
  debug: (message, data) => log('debug', message, data),
};