import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
    try {
      const connection = await mongoose.connect(process.env.MONGO_URI);
      console.log("Connected to MongoDB: " + connection.connection.host);
    } catch (error) {
      console.log("Error: " + error.message);
    }
  }

export default connectDB