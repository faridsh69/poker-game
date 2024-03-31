import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'

import { PokerGateway } from 'src/providers/poker.gateway'
import { DATABASE_CONFIG } from 'src/configs/database'
import { UsersModule } from 'src/modules/users.module'
import { TablesModule } from 'src/modules/tables.module'
import { IsUnique } from 'src/validations/customs/IsUnique'
import { AuthModule } from 'src/modules/auth.module'
import { PaymentsModule } from 'src/modules/payments.module'
import { TransactionsModule } from 'src/modules/transactions.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(DATABASE_CONFIG),
    PokerGateway,
    AuthModule,
    UsersModule,
    TablesModule,
    PaymentsModule,
    TransactionsModule,
  ],
  providers: [IsUnique],
})
export class AppModule {}
