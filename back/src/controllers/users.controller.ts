import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { UserService } from 'src/services/user.service'
import { CreateUserDto } from 'src/validations/create-user.dto'
import { UpdateUserDto } from 'src/validations/update-user.dto'

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async find() {
    return { data: await this.userService.find() }
  }

  @Get(':id')
  findOneBy(@Param('id') id: string) {
    return this.userService.findOneBy('id', +id)
  }

  @Delete(':id')
  softDelete(@Param('id') id: string) {
    return this.userService.softDelete(+id)
  }

  @Post()
  create(@Body() createModelDto: CreateUserDto) {
    return this.userService.create(createModelDto)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateModelDto: UpdateUserDto) {
    return this.userService.update(+id, updateModelDto)
  }
}
