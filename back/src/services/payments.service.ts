import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

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
    return PAYMENTS_SEEDER.map(async record => {
      return await this.modelRepository
        .findOne({ where: { id: record.id } })
        .then(async dbRecord => {
          if (dbRecord) {
            return Promise.resolve(null)
          }

          return Promise.resolve(await this.modelRepository.save(record))
        })
        .catch(error => Promise.reject(error))
    })
  }
}
