import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator'
import { Injectable } from '@nestjs/common'
import { User } from 'src/models/user.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

@ValidatorConstraint({ name: 'unique', async: true })
@Injectable()
export class UniqueValidator implements ValidatorConstraintInterface {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  validate = async (value: any, args: ValidationArguments): Promise<boolean> => {
    console.log('1 this.userRepository', this.userRepository)
    console.log('2 value', value)
    console.log('3 args', args)

    const [, fieldName] = args.constraints
    const entity = await this.userRepository.findOneBy({ [fieldName]: value })
    return !entity
  }

  defaultMessage(args: ValidationArguments) {
    const [, fieldName] = args.constraints
    return `${fieldName} must be unique`
  }
}
