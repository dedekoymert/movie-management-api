import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';

import { UserRepository } from 'src/users/domain/user.repository.interface';
import { UserLoginDto } from './dtos/user-login.dto';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/users/domain/user.entity';
import { UserRegisterDto } from './dtos/user-register.dto';

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

    const payload = { sub: user.getId(), username: user.getUsername() };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_SECRET'),
      }),
    };
  }

  async register(userRegisterDto: UserRegisterDto): Promise<User> {
    const hash = await bcrypt.hash(userRegisterDto.password, 10);
    const user = new User(
      new ObjectId().toString(),
      userRegisterDto.username,
      hash,
      userRegisterDto.age,
    );

    return this.userRepository.create(user);
  }
}
