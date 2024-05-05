import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UsersController } from 'src/controllers/users.controller'
import { Payment } from 'src/models/payment.entity'
import { Transaction } from 'src/models/transaction.entity'
import { User } from 'src/models/user.entity'
import { PaymentsService } from 'src/services/payments.service'
import { TransactionsService } from 'src/services/transactions.service'
import { UsersService } from 'src/services/users.service'

@Module({
  imports: [TypeOrmModule.forFeature([User, Payment, Transaction])],
  controllers: [UsersController],
  providers: [UsersService, PaymentsService, TransactionsService],
})
export class UsersModule {}
