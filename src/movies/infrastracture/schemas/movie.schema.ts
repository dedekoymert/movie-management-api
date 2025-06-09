import mongoose from 'mongoose';
import { ISession } from './session.schema';

export interface IMovie {
  _id: string;
  name: string;
  ageRestriction: number;
  sessions?: mongoose.Schema.Types.ObjectId[];
}

// export interface IPopulatedMovie {
//   _id: string;
//   name: string;
//   ageRestriction: number;
//   sessions?: ISession[];
// }

export const MovieSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  ageRestriction: { type: Number, required: true },
  sessions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Sessions' }],
});
