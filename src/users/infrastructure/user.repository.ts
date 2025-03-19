import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from '../domain/user.entity';
import { UserRepository } from '../domain/user.repository.interface';
import { IUser } from './schemas/user.schema';
import { Manager } from '../domain/manager.entity';
import { IManager } from './schemas/manager.schema';
import { Customer } from '../domain/customer.entity';
import { ICustomer } from './schemas/customer.schema';
import { UserFactory } from './user.factory';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectModel('Users')
    private userModel: Model<IUser>,
    @InjectModel('manager')
    private managerModel: Model<IManager>,
    @InjectModel('customer')
    private customerModel: Model<ICustomer>,
  ) {}

  async createUserManager(userManager: Manager): Promise<User> {
    const user = new this.managerModel({
      username: userManager.getUsername(),
      password: userManager.getPassword(),
      age: userManager.getAge(),
    });
    await user.save();
    return UserFactory.createUserEntity(user);
  }

  async createUserCustomer(userCustomer: Customer): Promise<User> {
    const user = new this.customerModel({
      username: userCustomer.getUsername(),
      password: userCustomer.getPassword(),
      age: userCustomer.getAge(),
    });
    await user.save();
    return UserFactory.createUserEntity(user);
  }

  async findOneByUsername(username: string): Promise<User | null> {
    const userDoc = await this.userModel
      .findOne({
        username,
      })
      .exec();
    return userDoc ? UserFactory.createUserEntity(userDoc) : null;
  }
}
