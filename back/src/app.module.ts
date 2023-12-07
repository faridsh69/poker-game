import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AppController } from './utils/app.controller'
import { AppService } from './utils/app.service'
import { ServerPokerGateway } from './table/serverPoker.gateway'

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, ServerPokerGateway],
})
export class AppModule {}
