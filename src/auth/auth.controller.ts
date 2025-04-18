import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './application/auth.service';
import { UserLoginDto } from './application/dtos/user-login.dto';
import { UserRegisterDto } from './application/dtos/user-register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() userLoginDto: UserLoginDto) {
    return this.authService.login(userLoginDto);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('register/manager')
  registerManager(@Body() userRegisterDto: UserRegisterDto) {
    return this.authService.registerManager(userRegisterDto);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('register/customer')
  registerCustomer(@Body() userRegisterDto: UserRegisterDto) {
    return this.authService.registerCustomer(userRegisterDto);
  }
}
