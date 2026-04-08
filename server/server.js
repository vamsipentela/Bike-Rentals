import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

// Route Imports
import authRoutes from './routes/authRoutes.js';
import bikeRoutes from './routes/bikeRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';

dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
app.use(express.json());

import bcrypt from 'bcryptjs';
import User from './models/User.js';

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/bikes', bikeRoutes);
app.use('/api/bookings', bookingRoutes);

// TEMPORARY DEBUG ROUTER: RUN ONCE to ensure admin jaggu@gmail.com works
app.get('/api/auth/debug-admin', async (req, res) => {
    try {
        console.log('--- DEBUG ADMIN ROUTE CALLED ---');
        await User.deleteMany({ email: 'jaggu@gmail.com' });
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('jaggu###123', salt);
        await User.create({
            name: 'Jaggu Admin',
            email: 'jaggu@gmail.com',
            password: 'jaggu###123', // Mongoose will hash this automatically if middleware is on, but we ensured it.
            isAdmin: true
        });
        res.json({ message: 'Admin jaggu@gmail.com / jaggu###123 forcefully created/reset! Try logging in now.' });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Connect to MongoDB Atlas
const startServer = async () => {
    try {
        await connectDB();
        
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Backend Server running on port ${PORT}`);
            console.log(`System synchronized with MongoDB Atlas Cluster`);
        });
    } catch (error) {
        console.error(`Application Failed to start: ${error.message}`);
    }
};

startServer();
