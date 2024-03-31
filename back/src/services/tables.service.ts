import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Table } from 'src/models/table.entity'
import { TABLES_SEEDER } from 'src/seeders/sources/tables.seeder'
import { CreateTableDto } from 'src/validations/create-table.dto'
import { UpdateTableDto } from 'src/validations/update-table.dto'

@Injectable()
export class TablesService {
  constructor(@InjectRepository(Table) private readonly modelRepository: Repository<Table>) {}

  find() {
    return this.modelRepository.find()
  }

  findOneBy(fieldName: string, value: string | number) {
    return this.modelRepository.findOneBy({ [fieldName]: value })
  }

  softDelete(id: number): Promise<{ affected?: number | null }> {
    return this.modelRepository.softDelete(id)
  }

  create(createModelDto: CreateTableDto) {
    const model = new Table()
    model.title = createModelDto.title
    model.pasoor = createModelDto.pasoor
    model.blinds_small = createModelDto.blinds_small
    model.blinds_big = createModelDto.blinds_big
    model.buyin_min = createModelDto.buyin_min
    model.buyin_max = createModelDto.buyin_max
    model.seats = createModelDto.seats

    return this.modelRepository.save(model)
  }

  update(id: number, updateModelDto: UpdateTableDto) {
    const model = new Table()
    model.id = id
    model.title = updateModelDto.title
    model.pasoor = updateModelDto.pasoor
    model.blinds_small = updateModelDto.blinds_small
    model.blinds_big = updateModelDto.blinds_big
    model.buyin_min = updateModelDto.buyin_min
    model.buyin_max = updateModelDto.buyin_max
    model.seats = updateModelDto.seats

    return this.modelRepository.save(model)
  }

  seed(): Array<Promise<Table | null>> {
    return TABLES_SEEDER.map(async record => {
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
