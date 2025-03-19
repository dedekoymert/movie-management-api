import { Customer } from './customer.entity';
import { Manager } from './manager.entity';
import { User } from './user.entity';

export interface UserRepository {
  createUserManager(userManager: Manager): Promise<User>;
  createUserCustomer(userCustomer: Customer): Promise<User>;
  findOneByUsername(username: string): Promise<User | null>;
}
