import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { TablesController } from 'src/controllers/tables.controller'
import { Table } from 'src/models/table.entity'
import { TablesService } from 'src/services/tables.service'

@Module({
  imports: [TypeOrmModule.forFeature([Table])],
  controllers: [TablesController],
  providers: [TablesService],
  // exports: [TablesService],
})
export class TablesModule {}
