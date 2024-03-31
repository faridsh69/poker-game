import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { CreateHistoryDto } from 'src/validations/create-history.dto'
import { UpdateHistoryDto } from 'src/validations/update-history.dto'
import { HISTORIES_SEEDER } from 'src/seeders/sources/histories.seeder'
import { History } from 'src/models/history.entity'

@Injectable()
export class HistoriesService {
  constructor(@InjectRepository(History) private readonly modelRepository: Repository<History>) {}

  find() {
    return this.modelRepository.find()
  }

  findOneBy(fieldName: string, value: string | number) {
    return this.modelRepository.findOneBy({ [fieldName]: value })
  }

  softDelete(id: number): Promise<{ affected?: number | null }> {
    return this.modelRepository.softDelete(id)
  }

  create(createModelDto: CreateHistoryDto) {
    const model = new History()
    model.table_id = createModelDto.table_id
    model.total = createModelDto.total
    model.roleTurn = createModelDto.roleTurn
    model.phase = createModelDto.phase
    model.seats = createModelDto.seats
    model.cards = createModelDto.cards
    model.pots = createModelDto.pots

    return this.modelRepository.save(model)
  }

  update(id: number, updateModelDto: UpdateHistoryDto) {
    const model = new History()
    model.id = id
    model.total = updateModelDto.total
    model.roleTurn = updateModelDto.roleTurn
    model.phase = updateModelDto.phase
    model.seats = updateModelDto.seats
    model.cards = updateModelDto.cards
    model.pots = updateModelDto.pots

    return this.modelRepository.save(model)
  }

  seed(): Array<Promise<History | null>> {
    return HISTORIES_SEEDER.map(async record => {
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
