import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compare } from 'bcrypt'

import { USERS_GENDERS, USERS_ROLES, USERS_STATUSES } from 'src/configs/database'
import { throwException } from 'src/helpers/http'
import { TypeUserMinimalObject, TypeUserWithToken } from 'src/interfaces/types'
import { User } from 'src/models/user.entity'
import { UsersService } from 'src/services/users.service'
import { LoginUserDto } from 'src/validations/login-user.dto'
import { RegisterUserDto } from 'src/validations/register.user.dto'

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

  async login(loginUserDto: LoginUserDto): Promise<TypeUserWithToken> {
    const user = await this.usersService.findOneBy('email', loginUserDto.email, true)

    if (!user) {
      return throwException('The specified user email does not exists.', false, 400)
    }

    const isPasswordMatch = await compare(loginUserDto.password, user.password)

    if (!isPasswordMatch) {
      return throwException("Your email and password don't match.", false, 400)
    }

    const userMinimalObject: TypeUserMinimalObject = { id: user.id, username: user.username, email: user.email }
    const accessToken = this.jwtService.sign(userMinimalObject)

    return {
      ...user,
      password: 'kose-nanat',
      access_token: accessToken,
    }
  }

  register(registerUserDto: RegisterUserDto) {
    const user = new User()
    user.username = registerUserDto.username
    user.email = registerUserDto.email
    user.password = registerUserDto.password
    user.status = USERS_STATUSES.needConfirm
    user.role = USERS_ROLES.player
    user.gender = USERS_GENDERS.male
    user.avatar_id = 1
    user.agent_percent = 0

    return this.usersService.save(user)
  }
}
