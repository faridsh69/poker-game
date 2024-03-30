import { NestFactory } from '@nestjs/core'

import { AppModule } from 'src/modules/app.module'
import { GLOBAL_PIPES } from 'src/configs/validation'
import { useContainer } from 'class-validator'
import { envConfig } from './configs/envConfig'

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule)

  app.enableCors()
  app.useGlobalPipes(GLOBAL_PIPES)
  useContainer(app.select(AppModule), { fallbackOnErrors: true })

  await app.listen(envConfig().port)
}

bootstrap()
