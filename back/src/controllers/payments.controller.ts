import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common'

import { AuthGuard } from 'src/guards/auth.gaurd'
import { PaymentsService } from 'src/services/payments.service'
import { CreatePaymentDto } from 'src/validations/create-payment.dto'
import { UpdatePaymentDto } from 'src/validations/update-payment.dto'

@Controller('payments')
@UseGuards(AuthGuard)
export class PaymentsController {
  constructor(private readonly modelService: PaymentsService) {}

  @Get()
  find() {
    return this.modelService.find()
  }

  @Post()
  create(@Body() createModelDto: CreatePaymentDto, @Req() request: Request) {
    return this.modelService.create(createModelDto, request)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateModelDto: UpdatePaymentDto) {
    return this.modelService.update(+id, updateModelDto)
  }

  @Delete(':id')
  softDelete(@Param('id') id: string) {
    return this.modelService.softDelete(+id)
  }
}
