import { User } from '../domain/user.entity';
import { UserRole } from '../domain/user-role.enum';
import { IUser } from './schemas/user.schema';
import { Manager } from '../domain/manager.entity';
import { Customer } from '../domain/customer.entity';

export class UserFactory {
  static createUserEntity(userDocument: IUser): User {
    switch (userDocument.role) {
      case UserRole.MANAGER:
        return new Manager(
          userDocument._id,
          userDocument.username,
          userDocument.password,
          userDocument.age,
        );
      case UserRole.CUSTOMER:
        return new Customer(
          userDocument._id,
          userDocument.username,
          userDocument.password,
          userDocument.age,
        );
      default:
        throw new Error(`Unknown user role}`);
    }
  }
}
