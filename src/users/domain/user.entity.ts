import { UserRole } from './user-role.enum';

export abstract class User {
  protected abstract readonly role: UserRole;

  constructor(
    protected readonly id: string,
    protected readonly username: string,
    protected readonly password: string,
    protected readonly age: number,
  ) {}

  getId(): string {
    return this.id;
  }

  getUsername(): string {
    return this.username;
  }

  getPassword(): string {
    return this.password;
  }

  getAge(): number {
    return this.age;
  }

  getRole(): UserRole {
    return this.role;
  }
}
