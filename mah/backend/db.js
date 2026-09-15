/**
 * Database connection and setup
 * Manages MongoDB connection
 */

const mongoose = require('mongoose');
const config = require('./config');
const logger = require('./logger');

let connection = null;

const connect = async () => {
  try {
    if (connection) {
      logger.info('Using existing database connection');
      return connection;
    }

    connection = await mongoose.connect(config.databaseUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    logger.info(`Connected to MongoDB: ${config.databaseUri}`);
    return connection;
  } catch (error) {
    logger.error('Failed to connect to MongoDB:', error.message);
    throw error;
  }
};

const disconnect = async () => {
  try {
    if (connection) {
      await mongoose.disconnect();
      connection = null;
      logger.info('Disconnected from MongoDB');
    }
  } catch (error) {
    logger.error('Error disconnecting from MongoDB:', error.message);
    throw error;
  }
};

const getConnection = () => connection;

module.exports = {
  connect,
  disconnect,
  getConnection,
  mongoose,
};