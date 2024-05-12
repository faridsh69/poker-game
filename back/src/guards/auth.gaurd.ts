import { CanActivate, ExecutionContext, HttpStatus, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'

import { Socket } from 'socket.io'
import { throwException } from 'src/helpers/http'
import { TypeUserMinimal } from 'src/interfaces/types'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest()
    const authorization = this.getAuthorizationFromHttp(request)
    const userMinimalObject = this.verifyHeaderAuthorization(authorization)
    // @ts-ignore
    request['minimalUser'] = userMinimalObject

    return true
  }

  verifyHeaderAuthorization(authorization: string | undefined, isWs = false): TypeUserMinimal {
    const [type, accessToken] = authorization?.split(' ') || []
    const token = type === 'Bearer' ? accessToken : undefined

    if (!token) {
      return throwException('You are not logged in', isWs, HttpStatus.UNAUTHORIZED)
    }

    try {
      return this.jwtService.verify(token) as TypeUserMinimal
    } catch {
      return throwException('Please login again, your token expired.', isWs, HttpStatus.UNAUTHORIZED)
    }
  }

  getAuthorizationFromHttp(request: Request): string | undefined {
    return request.headers.authorization
  }

  getAuthorizationFromSocket(client: Socket): string | undefined {
    return client.handshake?.headers?.authorization
  }
}
