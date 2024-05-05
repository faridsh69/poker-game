import { Body, Controller, Post } from '@nestjs/common'

import { AuthService } from 'src/services/auth.service'
import { LoginUserDto } from 'src/validations/login-user.dto'
import { RegisterUserDto } from 'src/validations/register.user.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto)
  }

  @Post('register')
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto)
  }
}
