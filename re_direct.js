import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

const reset = async () => {
    const client = new MongoClient(process.env.MONGO_URI);
    try {
        console.log('Connecting...');
        await client.connect();
        const db = client.db('bikerental');
        const users = db.collection('users');
        
        console.log('Cleaning...');
        await users.deleteMany({ email: 'jaggu@gmail.com' });
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('jaggu###123', salt);
        
        await users.insertOne({
            name: 'Jaggu Admin',
            email: 'jaggu@gmail.com',
            password: hashedPassword,
            isAdmin: true,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        
        console.log('FORCED SUCCESS: jaggu@gmail.com / jaggu###123');
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
        process.exit(0);
    }
};

reset();
