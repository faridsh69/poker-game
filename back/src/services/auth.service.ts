import { Injectable, HttpStatus, HttpException } from '@nestjs/common'
import { UserService } from 'src/services/user.service'
import { User } from 'src/models/user.entity'

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UserService, private readonly jwtService: JwtService) {}

  private async checkUserPassword(signedUser: User, password: string): Promise<boolean> {
    if (signedUser.password !== password) {
      return false
    }

    return true
  }

  async sign(credentials: { email: string; password: string }): Promise<any> {
    const user = await this.usersService.findOneBy('email', credentials.email)
    if (!user) throw new HttpException('The specified user does not exists', HttpStatus.BAD_REQUEST)

    const serializedUser = user.schema.methods.serialize(user)
    const isValid = await this.checkUserPassword(user, credentials.password)
    if (!isValid) throw new HttpException('The email/password combinaison is invalid', HttpStatus.BAD_REQUEST)

    const tokens = await this.jwtService.generateToken(serializedUser)

    return { tokens, user: serializedUser }
  }

  async refreshToken(token: string): Promise<any> {
    const user: User = await this.jwtService.verify(token)
    const tokens = await this.jwtService.generateToken(user)

    return { tokens, user }
  }
}
