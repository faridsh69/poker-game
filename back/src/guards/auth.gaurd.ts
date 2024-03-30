import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { WsException } from '@nestjs/websockets'
import { Request } from 'express'
import { Socket } from 'socket.io'

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest()
    const authorization = AuthGuard.getAuthorizationFromHttp(request)

    AuthGuard.verifyHeaderAuthorization(authorization)

    return true
  }

  static verifyHeaderAuthorization(authorization: string | undefined, isWs = false) {
    const [type, accessToken] = authorization?.split(' ') || []
    const token = type === 'Bearer' ? accessToken : undefined

    if (!token) {
      if (isWs) {
        throw new WsException('There is no token in header.')
      }
      throw new UnauthorizedException('There is no token in header.')
    }

    try {
      console.log('1 token', token)
      const payload = JwtService.verify(token)
      console.log('2 payload', payload)
      // request['user'] = payload
    } catch {
      if (isWs) {
        throw new WsException('Please login again, your token expired.')
      }
      throw new UnauthorizedException('Please login again, your token expired.')
    }
  }

  static getAuthorizationFromHttp(request: Request): string | undefined {
    return request.headers.authorization
  }

  static getAuthorizationFromSocket(client: Socket): string | undefined {
    return client.handshake?.headers?.authorization
  }
}
