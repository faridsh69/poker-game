import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { PaymentsController } from 'src/controllers/payments.controller'
import { Payment } from 'src/models/payment.entity'
import { PaymentsService } from 'src/services/payments.service'

@Module({
  imports: [TypeOrmModule.forFeature([Payment])],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
