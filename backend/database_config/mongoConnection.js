/**
 * MongoDB Connection Setup
 * Establishes and exports a singleton connection to MongoDB
 */

import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = process.env.DB_NAME || 'peer-tutor-connect';

let _connection = undefined;
let _db = undefined;

/**
 * Establishes connection to MongoDB
 * @returns {Promise<Db>} MongoDB database instance
 * @throws {Error} If connection fails
 */
const connectToDb = async () => {
  if (!_connection) {
    try {
      _connection = await MongoClient.connect(mongoUri, {
        maxPoolSize: 10,
        minPoolSize: 2,
        serverSelectionTimeoutMS: 5000,
      });
      _db = _connection.db(dbName);
      console.log(`Connected to MongoDB: ${dbName}`);
    } catch (error) {
      console.error('MongoDB connection error:', error);
      throw error;
    }
  }
  return _db;
};

/**
 * Gets the database instance
 * @returns {Db} MongoDB database instance
 * @throws {Error} If not connected
 */
const getDb = () => {
  if (!_db) {
    throw new Error('Database not initialized. Call connectToDb first.');
  }
  return _db;
};

/**
 * Closes the MongoDB connection
 * @returns {Promise<void>}
 */
const closeConnection = async () => {
  if (_connection) {
    await _connection.close();
    _connection = undefined;
    _db = undefined;
    console.log('MongoDB connection closed');
  }
};

export { connectToDb, getDb, closeConnection };
