import { Module } from '@nestjs/common'
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt'

import { AuthController } from 'src/controllers/auth.controller'
import { AuthService } from 'src/services/auth.service'
import { UsersModule } from 'src/modules/users.module'
import { envConfig } from 'src/configs/envConfig'

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      global: true,
      useFactory: (): JwtModuleOptions => {
        return {
          global: true,
          signOptions: {
            expiresIn: '48h',
          },
          secret: envConfig().secretKey,
        }
      },
    }),
    //   secretOrKeyProvider: (
    //     requestType: JwtSecretRequestType,
    //   ) => {
    //     if (requestType === JwtSecretRequestType.SIGN) {
    //       return envConfig().privateKey
    //     }
    //     if (requestType === JwtSecretRequestType.VERIFY) {
    //       return envConfig().publicKey
    //     }
    //     return envConfig().secretKey
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
