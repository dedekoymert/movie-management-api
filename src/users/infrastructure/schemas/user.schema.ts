import mongoose from 'mongoose';
import { UserRole } from 'src/users/domain/user-role.enum';

export interface IUser {
  _id: string;
  username: string;
  password: string;
  age: number;
  role: UserRole;
}

export const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number, required: true },
  },
  { discriminatorKey: 'role' },
);
