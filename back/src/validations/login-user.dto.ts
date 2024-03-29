import { IsBoolean, IsEmail, IsNotEmpty } from 'class-validator'

export class LoginUserDto {
  @IsNotEmpty()
  @IsEmail(undefined, { message: 'Please provide valid Email.' })
  email!: string

  @IsNotEmpty()
  password!: string

  @IsBoolean()
  remember!: boolean
}
