import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Request } from 'express'
import { Repository } from 'typeorm'

import { PAYMENTS_STATUSES } from 'src/configs/database'
import { seedData } from 'src/helpers/common'
import { Payment } from 'src/models/payment.entity'
import { PAYMENTS_SEEDER } from 'src/seeders/sources/payments.seeder'
import { CreatePaymentDto } from 'src/validations/create-payment.dto'
import { UpdatePaymentDto } from 'src/validations/update-payment.dto'

@Injectable()
export class PaymentsService {
  constructor(@InjectRepository(Payment) private readonly modelRepository: Repository<Payment>) {}

  find() {
    return this.modelRepository.find()
  }

  findOneBy(fieldName: string, value: string | number) {
    return this.modelRepository.findOneBy({ [fieldName]: value })
  }

  softDelete(id: number): Promise<{ affected?: number | null }> {
    return this.modelRepository.softDelete(id)
  }

  create(createModelDto: CreatePaymentDto) {
    const model = new Payment()

    model.user_id = createModelDto.user_id
    model.price = createModelDto.price
    model.user_giving = createModelDto.user_giving
    model.description = createModelDto.description
    model.gateway = createModelDto.gateway
    model.status = createModelDto.status
    model.wallet = createModelDto.wallet
    model.status = PAYMENTS_STATUSES.success

    return this.modelRepository.save(model)
  }

  depositeWithdraw(createModelDto: CreatePaymentDto, request: Request) {
    const model = new Payment()
    // @ts-ignore
    model.user_id = request.minimalUser.id
    model.price = createModelDto.price
    model.user_giving = createModelDto.user_giving
    model.description = createModelDto.description
    model.gateway = createModelDto.gateway
    model.status = createModelDto.status
    model.wallet = createModelDto.wallet
    model.status = PAYMENTS_STATUSES.pending

    return this.modelRepository.save(model)
  }

  update(id: number, updateModelDto: UpdatePaymentDto) {
    const model = new Payment()
    model.id = id
    model.user_id = updateModelDto.user_id
    model.price = updateModelDto.price
    model.user_giving = updateModelDto.user_giving
    model.description = updateModelDto.description
    model.gateway = updateModelDto.gateway
    model.status = updateModelDto.status
    model.wallet = updateModelDto.wallet

    return this.modelRepository.save(model)
  }

  seed(): Array<Promise<Payment | null>> {
    return seedData(PAYMENTS_SEEDER, this.modelRepository)
  }

  async findUserBalance(userId: number): Promise<number> {
    const sumPositive = await this.queryFindSumPrice(userId, true)
    const sumNegative = await this.queryFindSumPrice(userId, false)

    const sum = +sumPositive.sum_price - +sumNegative.sum_price

    return sum
  }

  async queryFindSumPrice(userId: number, userGiving: boolean) {
    return await this.modelRepository
      .createQueryBuilder('payments')
      .where('user_id = :userId', { userId })
      .andWhere('user_giving = :userGiving', { userGiving })
      .select('SUM(price)', 'sum_price')
      .getRawOne()
  }
}
