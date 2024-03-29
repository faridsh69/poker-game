import { Module } from '@nestjs/common'

import { AuthController } from 'src/controllers/auth.controller'
import { AuthService } from 'src/services/auth.service'
import { JwtService } from 'src/services/jwt.service'
import { UsersModule } from 'src/modules/users.module'

@Module({
  imports: [UsersModule],
  providers: [AuthService, JwtService],
  controllers: [AuthController],
  exports: [JwtService],
})
export class AuthModule {}
