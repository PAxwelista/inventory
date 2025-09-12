import { NestFactory } from '@nestjs/core';
import { InitialModule } from './initial.module';
import { ValidationPipe } from '@nestjs/common';

import { Client } from 'pg';

async function bootstrap() {
  

  // Test de connexion à la DB
  console.log(process.env.DB_HOST)
  const client = new Client({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: { rejectUnauthorized: false },
    family: 4, // force IPv4
  });

  try {
    await client.connect();
    console.log('✅ DB Connected!');
  } catch (err) {
    console.error('❌ DB Connection error:', err);
  } finally {
    await client.end();
  }
  const app = await NestFactory.create(InitialModule);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
