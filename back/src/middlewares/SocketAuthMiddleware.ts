import { JwtService } from '@nestjs/jwt'
import { Socket } from 'socket.io'
import { AuthGuard } from 'src/guards/auth.gaurd'

export const SocketAuthMiddleware = (jwtService: JwtService) => {
  return (socket: Socket, next: (err?: Error) => void) => {
    try {
      const authGarud = new AuthGuard(jwtService)
      const authorization = authGarud.getAuthorizationFromSocket(socket)
      authGarud.verifyHeaderAuthorization(authorization, true)

      next()
    } catch (error: any) {
      next(error)
    }
  }
}
