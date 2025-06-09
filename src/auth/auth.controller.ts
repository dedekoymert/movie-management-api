import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './application/auth.service';
import { LoginUserDto } from './application/dtos/login-user.dto';
import { RegisterUserDto } from './application/dtos/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() userLoginDto: LoginUserDto) {
    return this.authService.login(userLoginDto);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('register/manager')
  registerManager(@Body() userRegisterDto: RegisterUserDto) {
    return this.authService.registerManager(userRegisterDto);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('register/customer')
  registerCustomer(@Body() userRegisterDto: RegisterUserDto) {
    return this.authService.registerCustomer(userRegisterDto);
  }
}
