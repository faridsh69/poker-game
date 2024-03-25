import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from 'src/models/user.entity'
import { UserSeederService } from 'src/seeders/user/user.seeder.service'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserSeederService],
  exports: [UserSeederService],
})
export class UserSeederModule {}
