import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserDto } from '../validations/create-user.dto'
import { UpdateUserDto } from '../validations/update-user.dto'
import { User } from '../models/user.entity'

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  createUser(createUserDto: CreateUserDto): Promise<User> {
    console.log('2 createUserDto', createUserDto)
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

    return this.userRepository.save(user)
  }

  findAllUser(): Promise<User[]> {
    return this.userRepository.find()
  }

  viewUser(id: number): Promise<User | null> {
    return this.userRepository.findOneBy({ id })
  }

  updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
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

    return this.userRepository.save(user)
  }

  removeUser(id: number): Promise<{ affected?: number | null }> {
    return this.userRepository.delete(id)
  }
}
