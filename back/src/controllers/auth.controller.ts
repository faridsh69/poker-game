import { Controller, Post, Body } from '@nestjs/common'

import { AuthService } from 'src/services/auth.service'
import { LoginUserDto } from 'src/validations/login-user.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto)
  }
}
