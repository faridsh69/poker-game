import { IsAlphanumeric, IsEmail, IsEnum, IsInt, IsNotEmpty, IsString, Matches, MinLength, Validate } from 'class-validator'

import { USERS_GENDER_ENUM, USERS_ROLE_ENUM, USERS_STATUS_ENUM } from 'src/configs/database'
import { IsUnique } from 'src/validations/customs/IsUnique'
import { IsNullable } from 'src/validations/customs/IsNullable'
import { PASSWORD_REGEX } from 'src/configs/validation'

export class CreateUserDto {
  @IsAlphanumeric()
  @MinLength(3, { message: 'Username must have atleast 3 characters.' })
  @Validate(IsUnique, ['users', 'username'])
  username!: string

  @IsString()
  @MinLength(2, { message: 'First name must have atleast 2 characters.' })
  first_name!: string

  @IsString()
  @MinLength(2, { message: 'Last name must have atleast 2 characters.' })
  last_name!: string

  @IsNotEmpty()
  @IsEmail(undefined, { message: 'Please provide valid Email.' })
  email!: string

  @IsNullable()
  @MinLength(6, { message: 'Please provide valid Phone, at least 6 digits.' })
  phone!: string

  @IsEnum(USERS_STATUS_ENUM, {
    message: 'Status must be one of the values: ' + USERS_STATUS_ENUM.join(', '),
  })
  status!: string

  @IsEnum(USERS_ROLE_ENUM, {
    message: 'Role must be one of the values: ' + USERS_ROLE_ENUM.join(', '),
  })
  role!: string

  @IsNullable()
  @IsEnum(USERS_GENDER_ENUM, {
    message: 'Gender must be one of the values: ' + USERS_GENDER_ENUM.join(', '),
  })
  gender!: string

  @IsNullable()
  @IsInt({ message: 'Avatar must be a number.' })
  avatar_id!: number

  @IsNullable()
  @IsInt({ message: 'Agent Percent must be a number.' })
  agent_percent!: number

  @IsNotEmpty()
  @Matches(PASSWORD_REGEX, {
    message: `Password must contain Minimum 8 and maximum 20 characters, 
    at least one uppercase letter, 
    one lowercase letter, 
    one number and 
    one special character`,
  })
  password!: string
}
