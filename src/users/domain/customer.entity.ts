import { UserRole } from './user-role.enum';
import { User } from './user.entity';

export class Customer extends User {
  protected readonly role: UserRole = UserRole.CUSTOMER;

  constructor(id: string, username: string, password: string, age: number) {
    super(id, username, password, age);
  }
}
