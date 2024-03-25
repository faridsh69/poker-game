import { Logger, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DATABASE_CONFIG } from 'src/configs/database'
import { Seeder } from 'src/seeders/seeder'
import { UserSeederModule } from 'src/seeders/user/user.seeder.module'

@Module({
  imports: [TypeOrmModule.forRoot(DATABASE_CONFIG), UserSeederModule],
  providers: [Logger, Seeder],
})
export class SeederModule {}
