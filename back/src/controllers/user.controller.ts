import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { UserService } from 'src/services/user.service'
import { CreateUserDto } from 'src/validations/create-user.dto'
import { UpdateUserDto } from 'src/validations/update-user.dto'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  find() {
    return this.userService.find()
  }

  @Get(':id')
  findOneBy(@Param('id') id: string) {
    return this.userService.findOneBy('id', +id)
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.delete(+id)
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto)
  }
}
