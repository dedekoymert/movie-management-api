import mongoose from 'mongoose';
import { TimeSlot } from 'src/movies/domain/time-slot.enum';

export interface ISession {
  _id: string;
  movieId: mongoose.Schema.Types.ObjectId;
  date: Date;
  roomNumber: number;
  timeSlot: TimeSlot;
}

export const SessionSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  roomNumber: { type: Number, required: true },
  timeSlot: { type: String, required: true, enum: Object.values(TimeSlot) },
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movies',
    required: true,
  },
});
