import { Controller, Get } from '@nestjs/common';

import { UsersService } from '../application/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getHello(): string {
    // return this.usersService.getHello();
    return 'Hello World!';
  }
}
