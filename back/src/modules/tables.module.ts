import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { TablesController } from 'src/controllers/tables.controller'
import { Table } from 'src/models/table.entity'
import { TableService } from 'src/services/table.service'

@Module({
  imports: [TypeOrmModule.forFeature([Table])],
  controllers: [TablesController],
  providers: [TableService],
  exports: [TableService],
})
export class TablesModule {}
