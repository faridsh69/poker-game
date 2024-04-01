import { IsBoolean, IsEnum, IsInt, IsString } from 'class-validator'

import { TRANSACTIONS_REASONS } from 'src/configs/database'

export class CreateTransactionDto {
  @IsInt()
  user_id!: number

  @IsInt()
  price!: number

  @IsBoolean()
  user_giving!: boolean

  @IsString()
  description!: string

  @IsEnum(Object.values(TRANSACTIONS_REASONS), {
    message: `Reason must be one of the values: ${Object.values(TRANSACTIONS_REASONS).join(', ')}.`,
  })
  reason!: string

  @IsInt()
  table_id!: number

  @IsInt()
  bonus_code_id!: number
}
