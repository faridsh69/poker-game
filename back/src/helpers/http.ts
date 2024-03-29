import { HttpException, HttpStatus } from '@nestjs/common'
import { WsException } from '@nestjs/websockets'

export const throwException = (error: string | unknown, isWs = false) => {
  // @ts-ignore
  const message = error?.message || error
  if (isWs) {
    throw new WsException(message)
  }

  throw new HttpException(message, HttpStatus.BAD_REQUEST)
}
