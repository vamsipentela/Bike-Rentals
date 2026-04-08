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
      password: 'jaggu###123',
      isAdmin: true
    };

    const adminUser = await User.create(adminData);
    console.log('Admin user "jaggu@gmail.com" created successfully!');

    // Popular Vehicles for Seeding
    const bikeData = [
      {
        name: 'Access 125 Silver',
        brand: 'Suzuki',
        type: 'Scooter',
        fuel: 'Petrol',
        mileage: '50 kmpl',
        pricePerHour: 100,
        pricePerDay: 600,
        image: 'https://images.unsplash.com/photo-1626084300762-5f7a353683f2?auto=format&fit=crop&q=80&w=800',
        location: 'Amaravathi Hub',
        description: 'The elegant Suzuki Access 125 Silver—where style meets reliable performance. Perfect for your day-long city escapes in Amaravathi.',
        specs: [
          { label: 'Engine', value: '124 cc' },
          { label: 'Color', value: 'Silver Steel' },
          { label: 'Start', value: 'Kick & Electric' },
          { label: 'Boot', value: '21 Liters' }
        ]
      },
      {
        name: 'Honda Activa 6G',
        brand: 'Honda',
        type: 'Scooter',
        fuel: 'Petrol',
        mileage: '50 kmpl',
        pricePerHour: 100,
        pricePerDay: 600,
        location: 'Amaravathi Hub',
        image: 'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&q=80&w=800',
        description: 'The iconic Indian scooter, perfect for city commutes and quick errands.',
        specs: [
          { label: 'Engine', value: '109.51 cc' },
          { label: 'Max Power', value: '7.68 bhp' },
          { label: 'Fuel Capacity', value: '5.3 Liters' }
        ]
      },
      {
        name: 'Hero Splendor Plus',
        brand: 'Hero',
        type: 'Bike',
        fuel: 'Petrol',
        mileage: '65 kmpl',
        pricePerHour: 100,
        pricePerDay: 600,
        location: 'Amaravathi Hub',
        image: 'https://images.unsplash.com/photo-1502744691670-61a1e04d4b3c?auto=format&fit=crop&q=80&w=800',
        description: 'Reliable, fuel-efficient, and smooth. The go-to choice for effortless riding.',
        specs: [
          { label: 'Engine', value: '97.2 cc' },
          { label: 'Max Power', value: '7.91 bhp' }
        ]
      },
      {
        name: 'Bajaj Pulsar 150',
        brand: 'Bajaj',
        type: 'Bike',
        fuel: 'Petrol',
        mileage: '45 kmpl',
        pricePerHour: 100,
        pricePerDay: 600,
        location: 'Velgapudi, Amaravathi',
        image: 'https://images.unsplash.com/photo-1622185135505-2d795003994a?auto=format&fit=crop&q=80&w=800',
        description: 'Powerful performance meets stylish design. Experience the thrill of the road.',
        specs: [
          { label: 'Engine', value: '149.5 cc' },
          { label: 'Max Power', value: '13.8 bhp' }
        ]
      },
      {
        name: 'Royal Enfield Classic 350',
        brand: 'Royal Enfield',
        type: 'Bike',
        fuel: 'Petrol',
        mileage: '35 kmpl',
        pricePerHour: 100,
        pricePerDay: 600,
        location: 'Amaravathi Hub',
        image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=800',
        description: 'Legendary design and thump. A true cruiser for those who appreciate heritage.',
        specs: [
          { label: 'Engine', value: '349 cc' },
          { label: 'Max Power', value: '20.2 bhp' }
        ]
      }
    ];

    await Bike.insertMany(bikeData);
    console.log('Bike fleet seeded successfully!');

    process.exit();
  } catch (error) {
    console.error('Error clearing/seeding admin:', error);
    process.exit(1);
  }
};

clearAndSeedAdmin();
