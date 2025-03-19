import { User } from './user.entity';

export interface UserRepository {
  // login(user: User): Promise<string>;
  create(user: User): Promise<User>;
  findOneByUsername(username: string): Promise<User | null>;
}
