import { Module } from '@nestjs/common'
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'

import { envConfig } from 'src/configs/envConfig'
import { AuthController } from 'src/controllers/auth.controller'
import { User } from 'src/models/user.entity'
import { AuthService } from 'src/services/auth.service'
import { UsersService } from 'src/services/users.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
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
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService],
})
export class AuthModule {}
