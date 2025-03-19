import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';

import { User } from '../domain/user.entity';
import { UserRepository } from '../domain/user.repository.interface';
import { UserDocument } from './user.schema';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(user: User): Promise<User> {
    const userDoc = this.mapToDocument(user);
    await userDoc.save();
    return user;
  }

  async findOneByUsername(username: string): Promise<User | null> {
    const userDoc = await this.userModel
      .findOne({
        username,
      })
      .exec();
    return userDoc ? this.mapToEntity(userDoc) : null;
  }

  private mapToEntity(userDoc: UserDocument): User {
    const id = userDoc._id.toString();
    return new User(id, userDoc.username, userDoc.password, userDoc.age);
  }

  private mapToDocument(user: User): UserDocument {
    return new this.userModel({
      _id: new ObjectId(user.getId()),
      username: user.getUsername(),
      password: user.getPassword(),
      age: user.getAge(),
    });
  }
}
