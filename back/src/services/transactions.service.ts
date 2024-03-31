import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Transaction } from 'src/models/transaction.entity'
import { TRANSACTIONS_SEEDER } from 'src/seeders/transactions.seeder'
import { CreateTransactionDto } from 'src/validations/create-transaction.dto'
import { UpdateTransactionDto } from 'src/validations/update-transaction.dto'

@Injectable()
export class TransactionsService {
  constructor(@InjectRepository(Transaction) private readonly modelRepository: Repository<Transaction>) {}

  find() {
    return this.modelRepository.find()
  }

  findOneBy(fieldName: string, value: string | number) {
    return this.modelRepository.findOneBy({ [fieldName]: value })
  }

  softDelete(id: number): Promise<{ affected?: number | null }> {
    return this.modelRepository.softDelete(id)
  }

  create(createModelDto: CreateTransactionDto) {
    const model = new Transaction()
    model.user_id = createModelDto.user_id
    model.price = createModelDto.price
    model.user_giving = createModelDto.user_giving
    model.description = createModelDto.description
    model.reason = createModelDto.reason
    model.table_id = createModelDto.table_id
    model.bonus_code_id = createModelDto.bonus_code_id

    return this.modelRepository.save(model)
  }

  update(id: number, updateModelDto: UpdateTransactionDto) {
    const model = new Transaction()
    model.id = id
    model.user_id = updateModelDto.user_id
    model.price = updateModelDto.price
    model.user_giving = updateModelDto.user_giving
    model.description = updateModelDto.description
    model.reason = updateModelDto.reason
    model.table_id = updateModelDto.table_id
    model.bonus_code_id = updateModelDto.bonus_code_id

    return this.modelRepository.save(model)
  }

  seed(): Array<Promise<Transaction | null>> {
    return TRANSACTIONS_SEEDER.map(async record => {
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
