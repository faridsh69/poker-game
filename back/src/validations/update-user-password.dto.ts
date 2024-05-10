import { IsNotEmpty, Matches } from 'class-validator'
import { PASSWORD_REGEX } from 'src/configs/validation'

export class UpdateUserPasswordDto {
  @IsNotEmpty()
  @Matches(PASSWORD_REGEX, {
    message: `Password must contain Minimum 4 and maximum 40 characters, 
    at least one uppercase letter, 
    one lowercase letter, 
    one number`,
  })
  current_password!: string

  @IsNotEmpty()
  @Matches(PASSWORD_REGEX, {
    message: `Password must contain Minimum 4 and maximum 40 characters, 
    at least one uppercase letter, 
    one lowercase letter, 
    one number`,
  })
  new_password!: string
}
