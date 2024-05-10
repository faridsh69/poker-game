import { IsEnum, IsInt, IsString, MinLength } from 'class-validator'
import { USERS_GENDERS } from 'src/configs/database'
import { IsNullable } from 'src/validations/customs/IsNullable'

export class UpdateUserProfileDto {
  @IsString()
  @MinLength(2, { message: 'First name must have atleast 2 characters.' })
  first_name!: string

  @IsString()
  @MinLength(2, { message: 'Last name must have atleast 2 characters.' })
  last_name!: string

  @IsNullable()
  @MinLength(6, { message: 'Please provide valid Phone, at least 6 digits.' })
  phone!: string

  @IsNullable()
  @IsEnum(Object.values(USERS_GENDERS), {
    message: `Gender must be one of the values: ${Object.values(USERS_GENDERS).join(', ')}.`,
  })
  gender!: string

  @IsNullable()
  @IsInt({ message: 'Avatar must be a number.' })
  avatar_id!: number
}
