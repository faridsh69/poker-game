import { HttpException } from '@nestjs/common'
import { WsException } from '@nestjs/websockets'

export const throwException = (error: string, isWs = false, code = 400) => {
  const message = error

  if (isWs) {
    throw new WsException(message)
  }

  throw new HttpException(message, code)
}
