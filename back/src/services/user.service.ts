import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { User } from 'src/models/user.entity'
import { CreateUserDto } from 'src/validations/create-user.dto'
import { UpdateUserDto } from 'src/validations/update-user.dto'
import { SEEDER_USERS } from 'src/seeders/user.seeder'

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly modelRepository: Repository<User>) {}

  find(): Promise<User[]> {
    return this.modelRepository.find()
  }

  findOneBy(fieldName: string, value: string | number): Promise<User | null> {
    return this.modelRepository.findOneBy({ [fieldName]: value })
  }

  softDelete(id: number): Promise<{ affected?: number | null }> {
    return this.modelRepository.softDelete(id)
  }

  create(createModelDto: CreateUserDto): Promise<User> {
    const model: User = new User()
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

  update(id: number, updateModelDto: UpdateUserDto): Promise<User> {
    const model: User = new User()
    model.id = id
    model.username = updateModelDto.username
    model.first_name = updateModelDto.first_name
    model.last_name = updateModelDto.last_name
    model.email = updateModelDto.email
    model.phone = updateModelDto.phone
    model.status = updateModelDto.status
    model.role = updateModelDto.role
    model.gender = updateModelDto.gender
    model.avatar_id = updateModelDto.avatar_id
    model.agent_percent = updateModelDto.agent_percent
    model.password = updateModelDto.password

    return this.modelRepository.save(model)
  }

  seed(): Array<Promise<User | null>> {
    return SEEDER_USERS.map(async record => {
      return await this.modelRepository
        .findOne({ where: { email: record.email } })
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
