import { Logger, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { User } from 'src/models/user.entity'
import { Table } from 'src/models/table.entity'
import { Payment } from 'src/models/payment.entity'
import { DATABASE_CONFIG } from 'src/configs/database'
import { SeederService } from 'src/seeders/seeder.service'
import { UsersService } from 'src/services/users.service'
import { TablesService } from 'src/services/tables.service'
import { PaymentsService } from 'src/services/payments.service'

@Module({
  imports: [TypeOrmModule.forRoot(DATABASE_CONFIG), TypeOrmModule.forFeature([User, Table, Payment])],
  providers: [Logger, SeederService, UsersService, TablesService, PaymentsService],
})
export class SeederModule {}
