import { NestFactory } from '@nestjs/core'

import { AppModule } from 'src/modules/app.module'
import { GLOBAL_PIPES } from 'src/configs/validation'

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule)

  app.enableCors()
  app.useGlobalPipes(GLOBAL_PIPES)

  await app.listen(process.env.PORT as string)
}

bootstrap()
