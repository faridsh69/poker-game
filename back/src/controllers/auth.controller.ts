import { Controller, Post, Body } from '@nestjs/common'
import { TypeUserWithToken } from 'src/interfaces/types'

import { AuthService } from 'src/services/auth.service'
import { LoginUserDto } from 'src/validations/login-user.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  public async login(@Body() loginUserDto: LoginUserDto): Promise<TypeUserWithToken> {
    return await this.authService.login(loginUserDto)
  }
}
