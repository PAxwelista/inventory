import { NestFactory } from '@nestjs/core';
import { InitialModule } from './initial.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {

  const app = await NestFactory.create(InitialModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
