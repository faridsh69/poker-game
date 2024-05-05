import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common'

import { AuthGuard } from 'src/guards/auth.gaurd'
import { HistoriesService } from 'src/services/histories.service'
import { CreateHistoryDto } from 'src/validations/create-history.dto'
import { UpdateHistoryDto } from 'src/validations/update-history.dto'

@Controller('histories')
@UseGuards(AuthGuard)
export class HistoriesController {
  constructor(private readonly modelService: HistoriesService) {}

  @Get()
  find() {
    return this.modelService.find()
  }

  @Post()
  create(@Body() createModelDto: CreateHistoryDto) {
    return this.modelService.create(createModelDto)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateModelDto: UpdateHistoryDto) {
    return this.modelService.update(+id, updateModelDto)
  }

  @Delete(':id')
  softDelete(@Param('id') id: string) {
    return this.modelService.softDelete(+id)
  }
}
