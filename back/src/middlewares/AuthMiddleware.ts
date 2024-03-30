import { Socket } from 'socket.io'
import { AuthGuard } from 'src/guards/auth.gaurd'

export const SocketAuthMiddleware = (socket: Socket, next: (err?: Error) => void) => {
  try {
    const authorization = AuthGuard.getAuthorizationFromSocket(socket)
    AuthGuard.verifyHeaderAuthorization(authorization, true)

    next()
  } catch (error: any) {
    next(error)
  }
}
