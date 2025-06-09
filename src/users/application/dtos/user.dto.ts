import { UserRole } from 'src/users/domain/user-role.enum';
import { User } from 'src/users/domain/user.entity';

export class UserDto {
  constructor(
    readonly id: string,
    readonly username: string,
    readonly age: number,
    readonly role: UserRole,
  ) {}

  static mapTo(user: User): UserDto {
    return new UserDto(
      user.getId(),
      user.getUsername(),
      user.getAge(),
      user.getRole(),
    );
  }
}
