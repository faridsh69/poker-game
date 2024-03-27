import { Injectable, Logger } from '@nestjs/common'
import { UserService } from 'src/services/user.service'

@Injectable()
export class SeederService {
  constructor(private readonly logger: Logger, private readonly userSeederService: UserService) {}
  async seed() {
    await this.users()
      .then(completed => {
        this.logger.debug('Successfuly completed seeding users...')
        Promise.resolve(completed)
      })
      .catch(error => {
        this.logger.error('Failed seeding users...')
        Promise.reject(error)
      })
  }

  async users() {
    return await Promise.all(this.userSeederService.seed())
      .then(createdUsers => {
        // Can also use this.logger.verbose('...');
        this.logger.debug('No. of users created : ' + createdUsers.filter(nullValue => nullValue).length)
        return Promise.resolve(true)
      })
      .catch(error => Promise.reject(error))
  }
}
