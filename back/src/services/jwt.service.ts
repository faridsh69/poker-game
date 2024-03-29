import { Injectable } from '@nestjs/common'
import * as jwt from 'jsonwebtoken'

import { UserService } from 'src/services/user.service'
import { User } from 'src/models/user.entity'
import { throwException } from 'src/helpers/http'

export const JWT_CONFIG = {
  accessTokenExpires: '1h',
  rememberExpires: '24h',
  refreshTokenExpires: '8h',
  jwtSecret: 'MyS3cr3tK3YQQFarid', // move it to env
}

type TypePayload = {
  id: number
  email: string
  username: string
}

@Injectable()
export class JwtService {
  constructor(private readonly usersService: UserService) {}

  public generateAccessToken(user: User, remember: boolean): string {
    const payload: TypePayload = {
      id: user.id,
      email: user.email, // Revemo
      username: user.username, // Revemo
    }

    const expiresIn = remember ? JWT_CONFIG.rememberExpires : JWT_CONFIG.accessTokenExpires

    const accessToken = jwt.sign(payload, JWT_CONFIG.jwtSecret, {
      expiresIn,
    })

    return accessToken
  }

  public async verifyAccessToken(token: string, isWs = false): Promise<User | null> {
    try {
      const tokenUser = jwt.verify(token, JWT_CONFIG.jwtSecret) as TypePayload
      const user = await this.usersService.findOneBy('id', tokenUser.id)

      if (!user) {
        return throwException('Unauthorized access', isWs)
      }

      return user
    } catch (err) {
      return throwException(err, isWs)
    }
  }
}
