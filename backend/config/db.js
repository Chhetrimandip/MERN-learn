import mongoose from "mongoose";
import dotenv from "dotenv";
export const connectDB = async () => {  
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log('Error connecting to MongoDB:', error.message);
        process.exit(1); // process.exit(1) is used to exit the process with a failure code 1 0 means success
    }
};
