import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config({ path: '../.env' });

const recreateAdmin = async () => {
    try {
        console.log('Connecting to MONGO_URI:', process.env.MONGO_URI);
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Connected to: ${conn.connection.host}`);

        const adminEmail = 'jaggu@gmail.com';
        const adminPassword = 'jaggu###123';

        // Delete all suspected admins to start fresh
        const delResult = await User.deleteMany({ email: adminEmail });
        console.log(`Cleaned up existing accounts with ${adminEmail}: ${delResult.deletedCount}`);

        // Create fresh admin
        const admin = new User({
            name: 'Administrator',
            email: adminEmail,
            password: adminPassword,
            isAdmin: true
        });

        await admin.save();
        console.log('--- ADMIN CREATED SUCCESSFULLY ---');
        console.log('Email:', admin.email);
        console.log('Pass:', adminPassword);
        console.log('IsAdmin:', admin.isAdmin);
        console.log('---------------------------------');

        mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error('CRITICAL ERROR:', error.message);
        process.exit(1);
    }
};

recreateAdmin();
