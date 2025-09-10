import { Provider, Type } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { App } from '../../src/apps/app.entity';
import { Item } from '../../src/items/item.entity';
import { User } from '../../src/users/user.entity';

export const createTestingModule = (
  providers: Provider[] = [],
  controllers: Type<any>[] = [],
  imports: Type<any>[] = [],
): Promise<TestingModule> => {
  return Test.createTestingModule({
    imports: [
      TypeOrmModule.forRoot({
        type: 'sqlite',
        database: ':memory:',
        entities: [User, Item, App],
        synchronize: true,
      }),
      TypeOrmModule.forFeature([User, Item, App]),
      ...imports,
    ],
    providers,
    controllers,
  }).compile();
};
