import { IsEnum, IsInt, IsString } from 'class-validator'
import { SEAT_ROLES, TABLE_PHASES } from 'src/configs/serverPokerConstants'

export class CreateHistoryDto {
  @IsInt()
  table_id!: number

  @IsInt()
  total!: number

  @IsEnum(Object.values(SEAT_ROLES), {
    message: `roleTurn must be one of the values: ${Object.values(SEAT_ROLES).join(', ')}.`,
  })
  roleTurn!: string

  @IsEnum(Object.values(TABLE_PHASES), {
    message: `roleTurn must be one of the values: ${Object.values(TABLE_PHASES).join(', ')}.`,
  })
  phase!: string

  @IsString()
  seats!: string

  @IsString()
  cards!: string

  @IsString()
  pots!: string
}
