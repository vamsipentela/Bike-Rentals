import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: { type: String, select: false },
  isAdmin: { type: Boolean, default: false }
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

const reset = async () => {
    try {
        console.log('Connecting to Atlas...');
        await mongoose.connect(process.env.MONGO_URI);
        
        console.log('Cleaning existing...');
        await User.deleteMany({ email: 'jaggu@gmail.com' });
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('jaggu###123', salt);
        
        const admin = new User({
            name: 'Admin',
            email: 'jaggu@gmail.com',
            password: hashedPassword,
            isAdmin: true
        });
        
        // Disable schema middleware for this call to be sure
        await User.collection.insertOne({
            name: 'Admin',
            email: 'jaggu@gmail.com',
            password: hashedPassword,
            isAdmin: true,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        console.log('--- FORCED SUCCESS ---');
        console.log('Mail: jaggu@gmail.com');
        console.log('Pass: jaggu###123');
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
};

reset();
