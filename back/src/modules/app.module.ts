import { HistoriesModule } from './history.module'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { getDbConfig } from 'src/configs/database'
import { AuthModule } from 'src/modules/auth.module'
import { PaymentsModule } from 'src/modules/payments.module'
import { TablesModule } from 'src/modules/tables.module'
import { TransactionsModule } from 'src/modules/transactions.module'
import { UsersModule } from 'src/modules/users.module'
import { PokerGateway } from 'src/providers/poker.gateway'
import { IsUnique } from 'src/validations/customs/IsUnique'

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(getDbConfig()),
    PokerGateway,
    AuthModule,
    UsersModule,
    TablesModule,
    PaymentsModule,
    TransactionsModule,
    HistoriesModule,
  ],
  providers: [IsUnique],
})
export class AppModule {}
