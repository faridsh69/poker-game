import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'

import { TableService } from 'src/services/table.service'
import { CreateTableDto } from 'src/validations/create-table.dto'
import { UpdateTableDto } from 'src/validations/update-table.dto'

@Controller('tables')
export class TablesController {
  constructor(private readonly tableService: TableService) {}

  @Get()
  find() {
    return this.tableService.find()
  }

  @Post()
  create(@Body() createModelDto: CreateTableDto) {
    return this.tableService.create(createModelDto)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateModelDto: UpdateTableDto) {
    return this.tableService.update(+id, updateModelDto)
  }

  @Delete(':id')
  softDelete(@Param('id') id: string) {
    return this.tableService.softDelete(+id)
  }
}
