import { IsAlphanumeric, IsEmail, IsNotEmpty, Matches, MinLength, Validate } from 'class-validator'
import { PASSWORD_REGEX } from 'src/configs/validation'
import { IsUnique } from 'src/validations/customs/IsUnique'

export class RegisterUserDto {
  @IsNotEmpty()
  @IsEmail(undefined, { message: 'Please provide valid Email.' })
  @Validate(IsUnique, ['users', 'email'])
  email!: string

  @IsAlphanumeric()
  @MinLength(3, { message: 'Username must have atleast 3 characters.' })
  @Validate(IsUnique, ['users', 'username'])
  username!: string

  @IsNotEmpty()
  @Matches(PASSWORD_REGEX, {
    message: `Password must contain Minimum 4 and maximum 40 characters, 
    at least one uppercase letter, 
    one lowercase letter, 
    one number`,
  })
  password!: string
}
