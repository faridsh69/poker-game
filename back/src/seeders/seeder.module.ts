import { Logger, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { getDbConfig } from 'src/configs/database'
import { History } from 'src/models/history.entity'
import { Payment } from 'src/models/payment.entity'
import { Table } from 'src/models/table.entity'
import { Transaction } from 'src/models/transaction.entity'
import { User } from 'src/models/user.entity'
import { SeederService } from 'src/seeders/seeder.service'
import { HistoriesService } from 'src/services/histories.service'
import { PaymentsService } from 'src/services/payments.service'
import { TablesService } from 'src/services/tables.service'
import { TransactionsService } from 'src/services/transactions.service'
import { UsersService } from 'src/services/users.service'

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(getDbConfig()),
    TypeOrmModule.forFeature([User, Table, Payment, Transaction, History]),
  ],
  providers: [
    Logger,
    SeederService,
    UsersService,
    TablesService,
    PaymentsService,
    TransactionsService,
    HistoriesService,
  ],
})
export class SeederModule {}
