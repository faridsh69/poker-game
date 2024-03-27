import { Injectable } from '@nestjs/common'
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'
import { EntityManager, Not } from 'typeorm'

@ValidatorConstraint({ name: 'IsUnique', async: true })
@Injectable()
export class IsUnique implements ValidatorConstraintInterface {
  constructor(private readonly entityManager: EntityManager) {}
  async validate(value: string, args?: ValidationArguments): Promise<boolean> {
    const [tableName, column] = args?.constraints as string[]

    // @ts-ignore
    const modelId = args?.object?.id || 0
    const dataExist = await this.entityManager
      .getRepository(tableName)
      .createQueryBuilder(tableName)
      .where({ [column]: value })
      .andWhere({ id: Not(modelId) })
      .withDeleted()
      .getExists()

    return !dataExist
  }

  defaultMessage(validationArguments: ValidationArguments): string {
    const field = validationArguments.property

    return `${field} is already exist.`
  }
}
