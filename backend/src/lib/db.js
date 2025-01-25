import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const conn = mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB connected: ${(await conn).connection.host}`);
  } catch (error) {
    console.log('MongoDB connection error: ' + error);
  }
}