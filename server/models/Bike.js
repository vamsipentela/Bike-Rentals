import mongoose from 'mongoose';

const bikeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  type: { type: String, enum: ['Scooter', 'Bike'], required: true },
  fuel: { type: String, enum: ['Petrol', 'Electric'], required: true },
  mileage: { type: String, required: true },
  pricePerHour: { type: Number, required: true },
  pricePerDay: { type: Number, required: true },
  image: { type: String, required: true },
  description: { type: String },
  location: { type: String, default: 'Amaravathi Hub' },
  specs: [
    {
      label: { type: String },
      value: { type: String }
    }
  ],
  available: { type: Boolean, default: true }
}, {
  timestamps: true
});

export default mongoose.model('Bike', bikeSchema);
