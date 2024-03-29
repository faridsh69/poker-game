import { Injectable, Logger } from '@nestjs/common'

import { TableService } from 'src/services/table.service'
import { UserService } from 'src/services/user.service'

@Injectable()
export class SeederService {
  constructor(
    private readonly logger: Logger,
    private readonly userService: UserService,
    private readonly tableService: TableService,
  ) {}
  async seed() {
    await this.seeds()
      .then(completed => {
        this.logger.debug('Successfuly completed seeding...')
        Promise.resolve(completed)
      })
      .catch(error => {
        this.logger.error('Failed seeding...')
        Promise.reject(error)
      })
  }

  async seeds() {
    return await Promise.all([...this.userService.seed(), ...this.tableService.seed()])
      .then(createdModels => {
        this.logger.debug('No. of models created : ' + createdModels.filter(nullValue => nullValue).length)
        return Promise.resolve(true)
      })
      .catch(error => Promise.reject(error))
  }
}
