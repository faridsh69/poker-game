import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common'

import { AuthGuard } from 'src/guards/auth.gaurd'
import { TablesService } from 'src/services/tables.service'
import { CreateTableDto } from 'src/validations/create-table.dto'
import { UpdateTableDto } from 'src/validations/update-table.dto'

@Controller('tables')
@UseGuards(AuthGuard)
export class TablesController {
  constructor(private readonly modelService: TablesService) {}

  @Get()
  find() {
    return this.modelService.find()
  }

  @Post()
  create(@Body() createModelDto: CreateTableDto) {
    return this.modelService.create(createModelDto)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateModelDto: UpdateTableDto) {
    return this.modelService.update(+id, updateModelDto)
  }

  @Delete(':id')
  softDelete(@Param('id') id: string) {
    return this.modelService.softDelete(+id)
  }
}
