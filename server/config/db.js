import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000,
            family: 4
        });
        console.log(`DB Connected: MongoDB Atlas ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB Atlas Connection Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;
