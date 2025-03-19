import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';

import { UserRepository } from 'src/users/domain/user.repository.interface';
import { UserLoginDto } from './dtos/user-login.dto';
import { ConfigService } from '@nestjs/config';
import { UserRegisterDto } from './dtos/user-register.dto';
import { Manager } from 'src/users/domain/manager.entity';
import { UserDto } from 'src/users/application/dtos/user.dto';
import { Customer } from 'src/users/domain/customer.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(userLoginDto: UserLoginDto): Promise<{ access_token: string }> {
    const user = await this.userRepository.findOneByUsername(
      userLoginDto.username,
    );

    if (
      !user ||
      !(await bcrypt.compare(userLoginDto.password, user.getPassword()))
    ) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: user.getId(),
      username: user.getUsername(),
      role: user.getRole(),
    };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_SECRET'),
      }),
    };
  }

  async registerManager(userRegisterDto: UserRegisterDto): Promise<UserDto> {
    const user = await this.userRepository.findOneByUsername(
      userRegisterDto.username,
    );

    if (user) {
      throw new ConflictException('Username is already taken');
    }

    const hash = await bcrypt.hash(userRegisterDto.password, 10);
    const manager = new Manager(
      new ObjectId().toString(),
      userRegisterDto.username,
      hash,
      userRegisterDto.age,
    );

    const createdUser = await this.userRepository.createUserManager(manager);
    return {
      id: createdUser.getId(),
      username: createdUser.getUsername(),
      age: createdUser.getAge(),
      role: createdUser.getRole(),
    };
  }

  async registerCustomer(userRegisterDto: UserRegisterDto): Promise<UserDto> {
    const hash = await bcrypt.hash(userRegisterDto.password, 10);
    const user = new Customer(
      new ObjectId().toString(),
      userRegisterDto.username,
      hash,
      userRegisterDto.age,
    );

    const createdUser = await this.userRepository.createUserCustomer(user);
    return {
      id: createdUser.getId(),
      username: createdUser.getUsername(),
      age: createdUser.getAge(),
      role: createdUser.getRole(),
    };
  }
}
