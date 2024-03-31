import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Payment } from 'src/models/payment.entity'
import { PaymentsService } from 'src/services/payments.service'
import { PaymentsController } from 'src/controllers/payments.controller'

@Module({
  imports: [TypeOrmModule.forFeature([Payment])],
  controllers: [PaymentsController],
  providers: [PaymentsService],
  // exports: [PaymentsService],
})
export class PaymentsModule {}
