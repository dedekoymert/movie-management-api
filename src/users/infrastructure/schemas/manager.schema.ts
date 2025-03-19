import mongoose from 'mongoose';
import { UserRole } from 'src/users/domain/user-role.enum';

export interface IManager {
  _id: string;
  username: string;
  password: string;
  age: number;
  role: UserRole;
}

export const ManagerSchema = new mongoose.Schema();
