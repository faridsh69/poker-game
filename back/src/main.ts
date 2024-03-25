import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // #TODO fix cors later
  app.enableCors()

  await app.listen(process.env.PORT as string)
}
bootstrap()
