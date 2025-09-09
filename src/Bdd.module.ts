import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './items/item.entity';
import { ItemModule } from './items/items.module';
import { User } from './users/user.entity';
import { App } from './apps/app.entity';
import { UserModule } from './users/users.module';
import { AppModule } from './apps/apps.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Item,User,App],
      synchronize: true, //to remove in prod
    }),
    ItemModule,
    UserModule,
    AppModule
  ],
})
export class BddModule {}
