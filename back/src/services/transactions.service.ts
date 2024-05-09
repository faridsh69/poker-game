import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { seedData } from 'src/helpers/common'
import { Transaction } from 'src/models/transaction.entity'
import { TRANSACTIONS_SEEDER } from 'src/seeders/sources/transactions.seeder'
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
    return seedData(TRANSACTIONS_SEEDER, this.modelRepository)
  }

  async findUserBalance(userId: number): Promise<number> {
    const sumPositive = await this.queryFindSumPrice(userId, true)
    const sumNegative = await this.queryFindSumPrice(userId, false)

    const sum = +sumPositive.sum_price - +sumNegative.sum_price

    return sum
  }

  async queryFindSumPrice(userId: number, userGiving: boolean) {
    return await this.modelRepository
      .createQueryBuilder('transactions')
      .where('user_id = :userId', { userId })
      .andWhere('user_giving = :userGiving', { userGiving })
      .select('SUM(price)', 'sum_price')
      .getRawOne()
  }
}
