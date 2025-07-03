// models/Booking.ts
import mongoose, { Schema, model } from 'mongoose';

export interface IBooking {
  name: string;
  phone: string;
  debtAmount?: number;
  creditorsCount?: number;
  hasProperty?: boolean;
  message?: string;
  serviceType: 'consultation' | 'full' | 'documents';
  createdAt: Date;
}

const BookingSchema = new Schema<IBooking>({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  debtAmount: Number,
  creditorsCount: Number,
  hasProperty: Boolean,
  message: String,
  serviceType: { 
    type: String, 
    required: true,
    enum: ['consultation', 'full', 'documents'] 
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Booking || model<IBooking>('Booking', BookingSchema);