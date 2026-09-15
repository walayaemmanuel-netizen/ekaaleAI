/**
 * Server setup and configuration
 * Starts the Express server and manages connections
 */

const app = require('./app');
const db = require('./db');
const logger = require('./logger');
const config = require('./config');

const PORT = config.port || 3000;

// Start server
const server = app.listen(PORT, async () => {
  logger.info(`Server running on port ${PORT}`);

  try {
    // Initialize database connection
    await db.connect();
    logger.info('Database connected successfully');
  } catch (error) {
    logger.error('Failed to connect to database:', error);
    process.exit(1);
  }
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  logger.info('SIGTERM received, shutting down gracefully...');
  server.close(async () => {
    try {
      await db.disconnect();
      logger.info('Database disconnected');
      process.exit(0);
    } catch (error) {
      logger.error('Error disconnecting database:', error);
      process.exit(1);
    }
  });
});

process.on('SIGINT', async () => {
  logger.info('SIGINT received, shutting down gracefully...');
  server.close(async () => {
    try {
      await db.disconnect();
      logger.info('Database disconnected');
      process.exit(0);
    } catch (error) {
      logger.error('Error disconnecting database:', error);
      process.exit(1);
    }
  });
});

module.exports = server;