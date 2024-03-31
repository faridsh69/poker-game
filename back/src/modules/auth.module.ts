import { Module } from '@nestjs/common'
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt'

import { AuthController } from 'src/controllers/auth.controller'
import { AuthService } from 'src/services/auth.service'
// import { UsersModule } from 'src/modules/users.module'
import { envConfig } from 'src/configs/envConfig'
import { UsersService } from 'src/services/users.service'
import { User } from 'src/models/user.entity'
import { TypeOrmModule } from '@nestjs/typeorm'

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
