import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, UpdateResult } from 'typeorm'

import { User } from 'src/models/user.entity'
import { USERS_SEEDER } from 'src/seeders/sources/users.seeder'
import { CreateUserDto } from 'src/validations/create-user.dto'
import { UpdateUserDto } from 'src/validations/update-user.dto'

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly modelRepository: Repository<User>) {}

  find() {
    // const x = y
    return this.modelRepository.find()
  }

  findOneBy(fieldName: string, value: string | number, withDeleted = false) {
    return this.modelRepository.findOne({ where: { [fieldName]: value }, withDeleted })
  }

  softDelete(id: number): Promise<{ affected?: number | null }> {
    return this.modelRepository.softDelete(id)
  }

  create(createModelDto: CreateUserDto) {
    const model = new User()
    model.username = createModelDto.username
    model.first_name = createModelDto.first_name
    model.last_name = createModelDto.last_name
    model.email = createModelDto.email
    model.phone = createModelDto.phone
    model.status = createModelDto.status
    model.role = createModelDto.role
    model.gender = createModelDto.gender
    model.avatar_id = createModelDto.avatar_id
    model.agent_percent = createModelDto.agent_percent
    model.password = createModelDto.password

    return this.modelRepository.save(model)
  }

  update(id: number, updateModelDto: UpdateUserDto) {
    const model = new User()
    model.id = id
    model.first_name = updateModelDto.first_name
    model.last_name = updateModelDto.last_name
    model.phone = updateModelDto.phone
    model.gender = updateModelDto.gender
    model.avatar_id = updateModelDto.avatar_id
    model.status = updateModelDto.status
    model.role = updateModelDto.role
    model.agent_percent = updateModelDto.agent_percent
    model.password = updateModelDto.password

    return this.modelRepository.save(model)
  }

  updateProfile(id: number, updateModelDto: UpdateUserDto) {
    const model = new User()
    model.id = id
    model.first_name = updateModelDto.first_name
    model.last_name = updateModelDto.last_name
    model.phone = updateModelDto.phone
    model.gender = updateModelDto.gender
    model.avatar_id = updateModelDto.avatar_id

    return this.modelRepository.update(id, model)
  }

  updatePassword(id: number, password: string) {
    const model = new User()
    model.password = password

    return this.modelRepository.update(id, model)
  }

  save(model: User) {
    return this.modelRepository.save(model)
  }

  seed(): Array<Promise<User | UpdateResult | null>> {
    return USERS_SEEDER.map(async record => {
      return await this.modelRepository
        .findOne({ where: { id: record.id } })
        .then(async dbRecord => {
          if (dbRecord) {
            return Promise.resolve(await this.modelRepository.update(record.id, record))
          }

          return Promise.resolve(await this.modelRepository.save(record))
        })
        .catch(error => Promise.reject(error))
    })
  }
}
