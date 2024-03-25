import { NestFactory } from '@nestjs/core'
import { BadRequestException, ValidationPipe } from '@nestjs/common'

import { AppModule } from './app.module'
import { toFormalCase } from './helpers/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // #TODO fix cors later
  app.enableCors()

  app.useGlobalPipes(
    new ValidationPipe({
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
    }),
  )

  await app.listen(process.env.PORT as string)
}
bootstrap()
