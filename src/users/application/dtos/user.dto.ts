import { UserRole } from 'src/users/domain/user-role.enum';

export class UserDto {
  readonly id: string;
  readonly username: string;
  readonly age: number;
  readonly role: UserRole;
}
