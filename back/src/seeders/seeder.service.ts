import { Injectable, Logger } from '@nestjs/common'

import { UsersService } from 'src/services/users.service'
import { TablesService } from 'src/services/tables.service'
import { PaymentsService } from 'src/services/payments.service'
import { TransactionsService } from 'src/services/transactions.service'
import { HistoriesService } from 'src/services/histories.service'

@Injectable()
export class SeederService {
  constructor(
    private readonly logger: Logger,
    private readonly usersService: UsersService,
    private readonly tablesService: TablesService,
    private readonly paymentsService: PaymentsService,
    private readonly transactionsService: TransactionsService,
    private readonly historiesService: HistoriesService,
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
    return await Promise.all([
      ...this.usersService.seed(),
      ...this.tablesService.seed(),
      ...this.paymentsService.seed(),
      ...this.transactionsService.seed(),
      ...this.historiesService.seed(),
    ])
      .then(createdModels => {
        this.logger.debug('No. of models created : ' + createdModels.filter(nullValue => nullValue).length)
        return Promise.resolve(true)
      })
      .catch(error => Promise.reject(error))
  }
}
