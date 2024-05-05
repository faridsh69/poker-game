import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common'

import { AuthGuard } from 'src/guards/auth.gaurd'
import { TransactionsService } from 'src/services/transactions.service'
import { CreateTransactionDto } from 'src/validations/create-transaction.dto'
import { UpdateTransactionDto } from 'src/validations/update-transaction.dto'

@Controller('transactions')
@UseGuards(AuthGuard)
export class TransactionsController {
  constructor(private readonly modelService: TransactionsService) {}

  @Get()
  find() {
    return this.modelService.find()
  }

  @Post()
  create(@Body() createModelDto: CreateTransactionDto) {
    return this.modelService.create(createModelDto)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateModelDto: UpdateTransactionDto) {
    return this.modelService.update(+id, updateModelDto)
  }

  @Delete(':id')
  softDelete(@Param('id') id: string) {
    return this.modelService.softDelete(+id)
  }
}
