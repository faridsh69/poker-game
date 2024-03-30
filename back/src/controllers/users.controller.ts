import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common'
import { AuthGuard } from 'src/guards/auth.gaurd'

import { UserService } from 'src/services/user.service'
import { CreateUserDto } from 'src/validations/create-user.dto'
import { UpdateUserDto } from 'src/validations/update-user.dto'

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get()
  find() {
    return this.userService.find()
  }
  // find(@Req() request: Request) { request.user

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
