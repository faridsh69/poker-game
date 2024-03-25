import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'

import { ServerPokerGateway } from 'src/providers/poker.gateway'
import { UserModule } from './modules/user.module'
import { DATABASE_CONFIG } from './configs/database'

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot(DATABASE_CONFIG), UserModule],
  providers: [ServerPokerGateway],
})
export class AppModule {}
