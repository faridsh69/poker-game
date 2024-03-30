import { HttpException, HttpStatus } from '@nestjs/common'

export const throwException = (error: string | unknown) => {
  // @ts-ignore
  const message = error?.message || error

  throw new HttpException(message, HttpStatus.BAD_REQUEST)
}
