import { Logger, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DATABASE_CONFIG } from 'src/configs/database'
import { SeederService } from 'src/seeders/seeder.service'
import { UserSeederModule } from 'src/seeders/user/user.seeder.module'

@Module({
  imports: [TypeOrmModule.forRoot(DATABASE_CONFIG), UserSeederModule],
  providers: [Logger, SeederService],
})
export class SeederModule {}
