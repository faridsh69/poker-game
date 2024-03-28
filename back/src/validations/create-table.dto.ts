import { IsEnum, IsInt, MinLength, Validate } from 'class-validator'

import { IsUnique } from 'src/validations/customs/IsUnique'
import { TABLE_PASOORS } from 'src/configs/serverPokerConstants'

export class CreateTableDto {
  @MinLength(3, { message: 'Title must have atleast 3 characters.' })
  @Validate(IsUnique, ['tables', 'title'])
  title!: string

  @IsEnum(Object.values(TABLE_PASOORS), {
    message: `Status must be one of the values: ${Object.values(TABLE_PASOORS).join(', ')}.`,
  })
  pasoor!: string

  @IsInt()
  blinds_small!: number

  @IsInt()
  blinds_big!: number

  @IsInt()
  buyin_min!: number

  @IsInt()
  buyin_max!: number

  @IsInt()
  seats!: number
}
