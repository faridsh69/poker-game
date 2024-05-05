import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { HistoriesController } from 'src/controllers/histories.controller'
import { History } from 'src/models/history.entity'
import { HistoriesService } from 'src/services/histories.service'

@Module({
  imports: [TypeOrmModule.forFeature([History])],
  controllers: [HistoriesController],
  providers: [HistoriesService],
})
export class HistoriesModule {}
