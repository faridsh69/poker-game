import { Module } from '@nestjs/common'
import {
  JwtModule,
  JwtSecretRequestType,
  // JwtSignOptions,
  // JwtVerifyOptions
} from '@nestjs/jwt'

import { AuthController } from 'src/controllers/auth.controller'
import { AuthService } from 'src/services/auth.service'
import { UsersModule } from 'src/modules/users.module'
import { envConfig } from 'src/configs/envConfig'

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '120s' },
      secretOrKeyProvider: (
        requestType: JwtSecretRequestType,
        // tokenOrPayload: string | Object | Buffer,
        // verifyOrSignOrOptions?: JwtVerifyOptions | JwtSignOptions,
      ) => {
        console.log('1 requestType', requestType)
        if (requestType === JwtSecretRequestType.SIGN) {
          return envConfig().privateKey
        }

        if (requestType === JwtSecretRequestType.VERIFY) {
          return envConfig().publicKey
        }

        return envConfig().secretKey
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
