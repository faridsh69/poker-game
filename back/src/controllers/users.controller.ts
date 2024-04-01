import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common'

import { AuthGuard } from 'src/guards/auth.gaurd'
import { PaymentsService } from 'src/services/payments.service'
import { TransactionsService } from 'src/services/transactions.service'
import { UsersService } from 'src/services/users.service'
import { CreateUserDto } from 'src/validations/create-user.dto'
import { UpdateUserDto } from 'src/validations/update-user.dto'

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly paymentsService: PaymentsService,
    private readonly transactionsService: TransactionsService,
  ) {}

  @Get()
  async findAll() {
    return this.userService.find()
  }
  // find(@Req() request: Request) { request.userx

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const user = await this.userService.findOneBy('id', +id)
    const paymentSum = await this.paymentsService.findUserBalance(id)
    const transactionSum = await this.transactionsService.findUserBalance(id)
    const balance = paymentSum + transactionSum

    return { ...user, balance }
  }

  @Post()
  create(@Body() createModelDto: CreateUserDto) {
    return this.userService.create(createModelDto)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateModelDto: UpdateUserDto) {
    return this.userService.update(+id, updateModelDto)
  }

  @Delete(':id')
  softDelete(@Param('id') id: string) {
    return this.userService.softDelete(+id)
  }
}
