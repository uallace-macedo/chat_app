import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(`> MongoDB configured and connected.`);
  } catch (error) {
    console.log('MongoDB connection error: ' + error);
  }
}