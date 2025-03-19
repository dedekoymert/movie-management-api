import mongoose from 'mongoose';
import { UserRole } from 'src/users/domain/user-role.enum';

export interface ICustomer {
  _id: string;
  username: string;
  password: string;
  age: number;
  role: UserRole;
}

export const CustomerSchema = new mongoose.Schema();
