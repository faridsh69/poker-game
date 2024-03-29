import { Injectable } from '@nestjs/common'

import { UserService } from 'src/services/user.service'
import { JwtService } from 'src/services/jwt.service'
import { LoginUserDto } from 'src/validations/login-user.dto'
import { TypeUserWithToken } from 'src/interfaces/types'
import { throwException } from 'src/helpers/http'

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UserService, private readonly jwtService: JwtService) {}

  public async login(loginUserDto: LoginUserDto): Promise<TypeUserWithToken> {
    const user = await this.usersService.findOneBy('email', loginUserDto.email)

    if (!user) {
      return throwException('The specified user email does not exists.')
    }

    if (user.password !== loginUserDto.password) {
      return throwException("Your email and password don't match.")
    }

    const accessToken = this.jwtService.generateAccessToken(user, loginUserDto.remember)

    return {
      ...user,
      password: 'kose-nanat',
      access_token: accessToken,
    }
  }
}
