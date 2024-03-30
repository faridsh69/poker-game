import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { WsException } from '@nestjs/websockets'
import { Request } from 'express'
import { Socket } from 'socket.io'

import { TypeUserMinimalObject } from 'src/interfaces/types'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest()
    const authorization = this.getAuthorizationFromHttp(request)

    const userMinimalObject = this.verifyHeaderAuthorization(authorization)
    // @ts-ignore
    request['userx'] = userMinimalObject

    return true
  }

  verifyHeaderAuthorization(authorization: string | undefined, isWs = false): TypeUserMinimalObject {
    const [type, accessToken] = authorization?.split(' ') || []
    const token = type === 'Bearer' ? accessToken : undefined

    if (!token) {
      if (isWs) {
        throw new WsException('There is no token in header.')
      }
      throw new UnauthorizedException('There is no token in header.')
    }

    try {
      return this.jwtService.verify(token) as TypeUserMinimalObject
    } catch {
      if (isWs) {
        throw new WsException('Please login again, your token expired.')
      }
      throw new UnauthorizedException('Please login again, your token expired.')
    }
  }

  getAuthorizationFromHttp(request: Request): string | undefined {
    return request.headers.authorization
  }

  getAuthorizationFromSocket(client: Socket): string | undefined {
    return client.handshake?.headers?.authorization
  }
}
