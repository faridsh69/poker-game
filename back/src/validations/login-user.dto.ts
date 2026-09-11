import { IsBoolean, IsNotEmpty } from 'class-validator'

export class LoginUserDto {
  @IsNotEmpty()
  email!: string

  @IsNotEmpty()
  password!: string

  @IsBoolean()
  remember!: boolean
}
