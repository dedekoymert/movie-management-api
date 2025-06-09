import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';

import { UsersRepository } from 'src/users/domain/users.repository.interface';
import { LoginUserDto } from './dtos/login-user.dto';
import { ConfigService } from '@nestjs/config';
import { RegisterUserDto } from './dtos/register-user.dto';
import { Manager } from 'src/users/domain/manager.entity';
import { UserDto } from 'src/users/application/dtos/user.dto';
import { Customer } from 'src/users/domain/customer.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject('UsersRepository')
    private readonly usersRepository: UsersRepository,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(loginUserDto: LoginUserDto): Promise<{ access_token: string }> {
    const user = await this.usersRepository.findOneByUsername(
      loginUserDto.username,
    );

    if (
      !user ||
      !(await bcrypt.compare(loginUserDto.password, user.getPassword()))
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

  async registerManager(registerUserDto: RegisterUserDto): Promise<UserDto> {
    const user = await this.usersRepository.findOneByUsername(
      registerUserDto.username,
    );

    if (user) {
      throw new ConflictException('Username is already taken');
    }

    const hash = await bcrypt.hash(registerUserDto.password, 10);
    const manager = new Manager(
      new ObjectId().toString(),
      registerUserDto.username,
      hash,
      registerUserDto.age,
    );

    const createdUser = await this.usersRepository.createUserManager(manager);
    return UserDto.mapTo(createdUser);
  }

  async registerCustomer(registerUserDto: RegisterUserDto): Promise<UserDto> {
    const user = await this.usersRepository.findOneByUsername(
      registerUserDto.username,
    );

    if (user) {
      throw new ConflictException('Username is already taken');
    }

    const hash = await bcrypt.hash(registerUserDto.password, 10);
    const customer = new Customer(
      new ObjectId().toString(),
      registerUserDto.username,
      hash,
      registerUserDto.age,
    );

    const createdUser = await this.usersRepository.createUserCustomer(customer);
    return UserDto.mapTo(createdUser);
  }
}
