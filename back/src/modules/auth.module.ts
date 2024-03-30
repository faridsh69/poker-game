import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { AuthController } from 'src/controllers/auth.controller'
import { AuthService } from 'src/services/auth.service'
import { UsersModule } from 'src/modules/users.module'

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      global: true,
      secret: process.env.JWT_KEY,
      signOptions: { expiresIn: '120s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
