import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt'

import { User } from 'src/models/user.entity'
import { envConfig } from 'src/configs/envConfig'
import { AuthService } from 'src/services/auth.service'
import { UsersService } from 'src/services/users.service'
import { AuthController } from 'src/controllers/auth.controller'

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
