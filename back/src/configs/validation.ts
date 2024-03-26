import { BadRequestException, ValidationPipe } from '@nestjs/common'
import { toFormalCase } from 'src/helpers/common'

export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,20}$/

export const GLOBAL_PIPES = new ValidationPipe({
  exceptionFactory: errors => {
    const result = errors.map(error => {
      const property = error.property
      const formalProperty = toFormalCase(property)
      const errorType = Object.keys(error.constraints || {})[0]
      const constraint = error.constraints?.[errorType]
      const message = constraint?.replace(property, formalProperty)

      return { property, message }
    })

    return new BadRequestException(result)
  },
  stopAtFirstError: true,
})
