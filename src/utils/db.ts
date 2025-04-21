import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://Bapubaby:JhanviKotak2009@fastners.e3aqj.mongodb.net/?retryWrites=true&w=majority&appName=Fastners');
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
