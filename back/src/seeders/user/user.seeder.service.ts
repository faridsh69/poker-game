import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/models/user.entity'
import { Repository } from 'typeorm'
import { DATABASE_USERS } from './source'

@Injectable()
export class UserSeederService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  create(): Array<Promise<User | null>> {
    return DATABASE_USERS.map(async user => {
      return await this.userRepository
        .findOne({ where: { id: user.id } })
        .then(async dbUser => {
          if (dbUser) {
            return Promise.resolve(null)
          }
          return Promise.resolve(await this.userRepository.save(user))
        })
        .catch(error => Promise.reject(error))
    })
  }
}
