import { TestingModule } from '@nestjs/testing';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { createTestingModule } from '../../test/utils/test-utils';
import { AppModule } from '../apps/apps.module';
import { AppsService } from '../apps/apps.service';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { App } from '../apps/app.entity';
import { Repository } from 'typeorm';
import { Item } from './item.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import request from 'supertest';
import { INestApplication } from '@nestjs/common';

describe('Item', () => {
  let controller: ItemsController;
  let service: ItemsService;
  let appsService: AppsService;
  let usersService: UsersService;
  let module: TestingModule;
  let repository: Repository<Item>;
  let application: INestApplication;

  beforeAll(async () => {
    module = await createTestingModule(
      [ItemsService],
      [ItemsController],
      [AppModule],
    );
    controller = module.get<ItemsController>(ItemsController);
    service = module.get<ItemsService>(ItemsService);
    appsService = module.get<AppsService>(AppsService);
    usersService = module.get<UsersService>(UsersService);
    repository = module.get<Repository<Item>>(getRepositoryToken(Item));
    application = module.createNestApplication();
    await application.init();
  });

  let newUser: User;
  let newApp: App;

  const user = {
    name: 'Tom',
    email: 'Hello@gmail.com',
    password: 'passwordTest',
  };

  const item = {
    name: 'Pasta',
    quantity: 2,
    app_user_id: 'Axel',
  };
  afterAll(async () => {
    await application.close();
  });

  describe('createItem', () => {
    it('should create a new item into a database', async () => {
      newUser = await usersService.createUser(user);

      const app = {
        name: 'newApp',
        user_id: newUser.id,
      };

      newApp = await appsService.createApp(app);
      const newItem = await controller.createItem({ app: newApp } as any, item);

      await request(application.getHttpServer())
        .post(`/items`)
        .set('x-api-key', newApp.api_key)
        .send(item)
        .expect(201);

      const dbItem = await repository.findOne({ where: { id: newItem.id } });
      expect(dbItem).toMatchObject(item);
    });
  });
  describe('findWithAppUserId', () => {
    it('should find all items of appUser', async () => {
      const findItem = {
        name: 'Pasta',
        quantity: 2,
        app_user_id: 'Tom',
      };

      await service.createItem(findItem, newApp);

      const response = await request(application.getHttpServer())
        .get(`/items/findWithAppUserId/${findItem.app_user_id}`)
        .set('x-api-key', newApp.api_key)
        .expect(200);

      expect(response.body).toMatchObject([findItem]);
    });
  });
  describe('softDelete', () => {
    it('should update delete_at', async () => {
      const newItem = await controller.createItem({ app: newApp } as any, item);

      const dbItem = await repository.findOne({ where: { id: newItem.id } });

      expect(dbItem?.delete_at).toBe(null);

      await request(application.getHttpServer())
        .patch(`/items/softDelete/${newItem.id}`)
        .set('x-api-key', newApp.api_key)
        .expect(200);

      const dbItemDeleted = await repository.findOne({
        where: { id: newItem.id },
      });

      expect(dbItemDeleted?.delete_at).not.toBe(null);
    });
  });
});
