import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Bike from './models/Bike.js';
import Booking from './models/Booking.js';

dotenv.config();

const clearAndSeedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to Local MongoDB. Starting Fresh...');

    // Remove EVERY collection
    await User.deleteMany({});
    await Bike.deleteMany({});
    await Booking.deleteMany({});
    console.log('All Users, Bikes, and Bookings removed!');

    const adminData = {
      name: 'Jaggu Admin',
      email: 'jaggu@gmail.com',
      password: 'jaggu123',
      isAdmin: true
    };

    const adminUser = await User.create(adminData);
    console.log('Admin user "jaggu@gmail.com" created successfully!');
    console.log('Password: jaggu123');
    
    process.exit();
  } catch (error) {
    console.error('Error clearing/seeding admin:', error);
    process.exit(1);
  }
};

clearAndSeedAdmin();
