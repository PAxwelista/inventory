import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './items/item.entity';
import { ItemModule } from './items/items.module';
import { User } from './users/user.entity';
import { App } from './apps/app.entity';
import { UserModule } from './users/users.module';
import { AppModule } from './apps/apps.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as fs from 'fs';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        `.env.${process.env.NODE_ENV}.local`,
        `.env.${process.env.NODE_ENV}`,
        '.env',
      ],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        ssl:process.env.NODE_ENV === 'production'? {
          ca: fs.readFileSync('etc/secrets/ca.pem').toString(),
          rejectUnauthorized: true
        } : false,
        rejectUnauthorized :  process.env.NODE_ENV === 'production',
        entities: [Item, User, App],
        synchronize: true,
      }),
    }),
    ItemModule,
    UserModule,
    AppModule,
  ],
})
export class InitialModule {}
