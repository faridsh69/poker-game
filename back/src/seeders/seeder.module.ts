import { Logger, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { DATABASE_CONFIG } from 'src/configs/database'
import { SeederService } from 'src/seeders/seeder.service'
import { UsersModule } from 'src/modules/users.module'

@Module({
  imports: [TypeOrmModule.forRoot(DATABASE_CONFIG), UsersModule],
  providers: [Logger, SeederService],
})
export class SeederModule {}
