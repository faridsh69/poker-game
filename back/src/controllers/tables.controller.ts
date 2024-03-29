import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'

import { TableService } from 'src/services/table.service'
import { CreateTableDto } from 'src/validations/create-table.dto'
import { UpdateTableDto } from 'src/validations/update-table.dto'

@Controller('tables')
export class TablesController {
  constructor(private readonly tableService: TableService) {}

  @Get()
  public async find() {
    return { data: await this.tableService.find() }
  }

  @Get(':id')
  public async findOneBy(@Param('id') id: string) {
    return { data: await this.tableService.findOneBy('id', +id) }
  }

  @Delete(':id')
  public async softDelete(@Param('id') id: string) {
    return await this.tableService.softDelete(+id)
  }

  @Post()
  public async create(@Body() createModelDto: CreateTableDto) {
    return await this.tableService.create(createModelDto)
  }

  @Patch(':id')
  public async update(@Param('id') id: string, @Body() updateModelDto: UpdateTableDto) {
    return await this.tableService.update(+id, updateModelDto)
  }
}
