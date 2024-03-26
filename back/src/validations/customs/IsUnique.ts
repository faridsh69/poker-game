import { Injectable } from '@nestjs/common'
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'
import { EntityManager } from 'typeorm'

@ValidatorConstraint({ name: 'IsUniqueConstraint', async: true })
@Injectable()
export class IsUnique implements ValidatorConstraintInterface {
  constructor(private readonly entityManager: EntityManager) {}
  async validate(value: any, args?: ValidationArguments): Promise<boolean> {
    const [tableName, column] = args?.constraints as string[]
    // console.log('1 value', value)
    // console.log('2 tableName', tableName)
    // console.log('3 column', column)
    // console.log('4 entityManager', this.entityManager)

    const dataExist = await this.entityManager
      .getRepository(tableName)
      .createQueryBuilder(tableName)
      .where({ [column]: value })
      .getExists()

    return !dataExist
  }

  defaultMessage(validationArguments: ValidationArguments): string {
    const field = validationArguments.property

    return `${field} is already exist`
  }
}
