import { Logger, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'

import { PokerGateway } from 'src/providers/poker.gateway'
import { DATABASE_CONFIG } from 'src/configs/database'
import { UsersModule } from 'src/modules/users.module'
import { TablesModule } from 'src/modules/tables.module'
import { IsUnique } from 'src/validations/customs/IsUnique'

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot(DATABASE_CONFIG), UsersModule, TablesModule],
  providers: [Logger, PokerGateway, IsUnique],
})
export class AppModule {}
