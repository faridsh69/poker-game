import { IsAlphanumeric, IsEmail, IsEnum, IsInt, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator'
import { USERS_GENDER_ENUM, USERS_ROLE_ENUM, USERS_STATUS_ENUM } from 'src/configs/database'

const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,20}$/

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(3, { message: 'Username must have atleast 3 characters.' })
  @IsAlphanumeric(undefined, {
    message: 'Username should be alpha numeric chars.',
  })
  username!: string

  @IsString()
  @MinLength(2, { message: 'First name must have atleast 2 characters.' })
  @IsNotEmpty()
  first_name!: string

  @IsString()
  @MinLength(2, { message: 'Last name must have atleast 2 characters.' })
  @IsNotEmpty()
  last_name!: string

  @IsNotEmpty()
  @IsEmail(undefined, { message: 'Please provide valid Email.' })
  email!: string

  @IsString()
  @MinLength(6, { message: 'Please provide valid Phone, at least 6 digits.' })
  @IsNotEmpty()
  phone!: string

  @IsString()
  @IsEnum(USERS_STATUS_ENUM, {
    message: 'Status must be one of the values: ' + USERS_STATUS_ENUM.join(', '),
  })
  status!: string

  @IsString()
  @IsEnum(USERS_ROLE_ENUM, {
    message: 'Role must be one of the values: ' + USERS_ROLE_ENUM.join(', '),
  })
  role!: string

  @IsString()
  @IsEnum(USERS_GENDER_ENUM, {
    message: 'Gender must be one of the values: ' + USERS_GENDER_ENUM.join(', '),
  })
  gender!: string

  @IsInt({ message: 'Avatar must be a number.' })
  avatar_id!: number

  @IsInt()
  agent_percent!: number

  @IsNotEmpty()
  @Matches(passwordRegEx, {
    message: `Password must contain Minimum 8 and maximum 20 characters, 
    at least one uppercase letter, 
    one lowercase letter, 
    one number and 
    one special character`,
  })
  password!: string
}
