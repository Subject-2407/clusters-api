import mongoose from 'mongoose';
import logger from '../utils/logger';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    logger.info("MongoDB successfully connected.");
  } catch (err) {
    logger.info(`Failed to connect to MongoDB: ${err}`);
    process.exit(1);
  }
};

export default connectDB;