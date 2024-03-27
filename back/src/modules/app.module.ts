import { Logger, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'

import { DATABASE_CONFIG } from 'src/configs/database'
import { PokerGateway } from 'src/providers/poker.gateway'
import { UsersModule } from 'src/modules/users.module'
import { IsUnique } from 'src/validations/customs/IsUnique'

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot(DATABASE_CONFIG), UsersModule],
  providers: [Logger, PokerGateway, IsUnique],
})
export class AppModule {}
