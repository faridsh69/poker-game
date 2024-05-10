import { IsBoolean, IsEnum, IsInt, IsString } from 'class-validator'
import { PAYMENTS_GATEWAYS, PAYMENTS_STATUSES } from 'src/configs/database'
import { IsNullable } from 'src/validations/customs/IsNullable'

export class CreatePaymentDto {
  @IsInt()
  user_id!: number

  @IsInt()
  price!: number

  @IsBoolean()
  user_giving!: boolean

  @IsNullable()
  @IsString()
  description!: string

  @IsEnum(Object.values(PAYMENTS_GATEWAYS), {
    message: `Gateway must be one of the values: ${Object.values(PAYMENTS_GATEWAYS).join(', ')}.`,
  })
  gateway!: string

  @IsEnum(Object.values(PAYMENTS_STATUSES), {
    message: `Status must be one of the values: ${Object.values(PAYMENTS_STATUSES).join(', ')}.`,
  })
  status!: string

  @IsNullable()
  @IsString()
  wallet!: string
}
