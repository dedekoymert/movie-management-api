import { UserRole } from './user-role.enum';
import { User } from './user.entity';

export class Manager extends User {
  protected readonly role: UserRole = UserRole.MANAGER;

  constructor(id: string, username: string, password: string, age: number) {
    super(id, username, password, age);
  }
}
