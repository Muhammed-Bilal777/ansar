import mongoose from 'mongoose';
import { config } from './index.js';
import logger from '../logger/logger.js';

export async function connectDB() {
  try {
    await mongoose.connect(config.mongoUrl);
    logger.info('✅ Connected to MongoDB');
  } catch (error) {
    logger.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
}
