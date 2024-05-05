import { envConfig } from './configs/envConfig'
import { NestFactory } from '@nestjs/core'

import { useContainer } from 'class-validator'
import { GLOBAL_PIPES } from 'src/configs/validation'
import { AppModule } from 'src/modules/app.module'

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule)

  app.enableCors()
  app.useGlobalPipes(GLOBAL_PIPES)
  app.setGlobalPrefix('api')

  useContainer(app.select(AppModule), { fallbackOnErrors: true })

  await app.listen(envConfig().port)
}

bootstrap()
