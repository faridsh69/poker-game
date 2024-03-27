import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { User } from 'src/models/user.entity'
import { CreateUserDto } from 'src/validations/create-user.dto'
import { UpdateUserDto } from 'src/validations/update-user.dto'

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

  create(createUserDto: CreateUserDto): Promise<User> {
    const user: User = new User()
    user.username = createUserDto.username
    user.first_name = createUserDto.first_name
    user.last_name = createUserDto.last_name
    user.email = createUserDto.email
    user.phone = createUserDto.phone
    user.status = createUserDto.status
    user.role = createUserDto.role
    user.gender = createUserDto.gender
    user.avatar_id = createUserDto.avatar_id
    user.agent_percent = createUserDto.agent_percent
    user.password = createUserDto.password

    return this.modelRepository.save(user)
  }

  update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user: User = new User()
    user.id = id
    user.username = updateUserDto.username
    user.first_name = updateUserDto.first_name
    user.last_name = updateUserDto.last_name
    user.email = updateUserDto.email
    user.phone = updateUserDto.phone
    user.status = updateUserDto.status
    user.role = updateUserDto.role
    user.gender = updateUserDto.gender
    user.avatar_id = updateUserDto.avatar_id
    user.agent_percent = updateUserDto.agent_percent
    user.password = updateUserDto.password

    return this.modelRepository.save(user)
  }
}
