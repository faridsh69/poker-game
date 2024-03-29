import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'

import { Table } from 'src/models/table.entity'
import { TableService } from 'src/services/table.service'
import { CreateTableDto } from 'src/validations/create-table.dto'
import { UpdateTableDto } from 'src/validations/update-table.dto'

@Controller('tables')
export class TablesController {
  constructor(private readonly tableService: TableService) {}

  @Get()
  public async find(): Promise<Table[]> {
    return await this.tableService.find()
  }

  @Get(':id')
  public async findOneBy(@Param('id') id: string): Promise<Table | null> {
    return await this.tableService.findOneBy('id', +id)
  }

  @Delete(':id')
  public async softDelete(@Param('id') id: string) {
    return await this.tableService.softDelete(+id)
  }

  @Post()
  public async create(@Body() createModelDto: CreateTableDto): Promise<Table> {
    return await this.tableService.create(createModelDto)
  }

  @Patch(':id')
  public async update(@Param('id') id: string, @Body() updateModelDto: UpdateTableDto): Promise<Table> {
    return await this.tableService.update(+id, updateModelDto)
  }
}
