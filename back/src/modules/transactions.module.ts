import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { TransactionsService } from 'src/services/transactions.service'
import { TransactionsController } from 'src/controllers/transactions.controllers'
import { Transaction } from 'src/models/transaction.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Transaction])],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
