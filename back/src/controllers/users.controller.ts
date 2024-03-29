import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'

import { User } from 'src/models/user.entity'
import { UserService } from 'src/services/user.service'
import { CreateUserDto } from 'src/validations/create-user.dto'
import { UpdateUserDto } from 'src/validations/update-user.dto'

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get()
  public async find(): Promise<User[]> {
    return await this.userService.find()
  }

  @Get(':id')
  public async findOneBy(@Param('id') id: string): Promise<User | null> {
    return await this.userService.findOneBy('id', +id)
  }

  @Delete(':id')
  public async softDelete(@Param('id') id: string) {
    return await this.userService.softDelete(+id)
  }

  @Post()
  public async create(@Body() createModelDto: CreateUserDto): Promise<User> {
    return await this.userService.create(createModelDto)
  }

  @Patch(':id')
  public async update(@Param('id') id: string, @Body() updateModelDto: UpdateUserDto): Promise<User> {
    return await this.userService.update(+id, updateModelDto)
  }
}
