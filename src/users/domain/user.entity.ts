export class User {
  constructor(
    private readonly id: string,
    private readonly username: string,
    private readonly password: string,
    private readonly age: number,
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
}
