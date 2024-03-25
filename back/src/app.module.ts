import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'

import { ServerPokerGateway } from 'src/table/serverPoker.gateway'
import { UserModule } from './user/user.module'
import { DATABASE_CONFIG } from './configs/database'

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot(DATABASE_CONFIG), UserModule],
  controllers: [],
  providers: [ServerPokerGateway],
})
export class AppModule {}
