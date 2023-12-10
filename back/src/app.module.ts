import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { ServerPokerGateway } from 'src/table/serverPoker.gateway'

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [],
  providers: [ServerPokerGateway],
})
export class AppModule {}
