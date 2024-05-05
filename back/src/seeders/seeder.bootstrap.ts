import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import { SeederModule } from 'src/seeders/seeder.module'
import { SeederService } from 'src/seeders/seeder.service'

const seederBootstrap = async () => {
  NestFactory.createApplicationContext(SeederModule)
    .then(appContext => {
      const logger = appContext.get(Logger)
      const seederService = appContext.get(SeederService)
      seederService
        .seed()
        .then(() => {
          logger.debug('Seeding complete!')
        })
        .catch(error => {
          logger.error('Seeding failed!')
          throw error
        })
        .finally(() => appContext.close())
    })
    .catch(error => {
      throw error
    })
}

seederBootstrap()
