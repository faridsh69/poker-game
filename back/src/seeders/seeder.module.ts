import { Logger, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'

import { User } from 'src/models/user.entity'
import { Table } from 'src/models/table.entity'
import { Payment } from 'src/models/payment.entity'
import { getDbConfig } from 'src/configs/database'
import { SeederService } from 'src/seeders/seeder.service'
import { UsersService } from 'src/services/users.service'
import { TablesService } from 'src/services/tables.service'
import { PaymentsService } from 'src/services/payments.service'
import { TransactionsService } from 'src/services/transactions.service'
import { Transaction } from 'src/models/transaction.entity'
import { History } from 'src/models/history.entity'
import { HistoriesService } from 'src/services/histories.service'

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
