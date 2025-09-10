import { TestingModule } from '@nestjs/testing';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { createTestingModule } from '../../test/utils/test-utils';
import { AppModule } from '../apps/apps.module';
import { AppsService } from '../apps/apps.service';
import { UsersService } from '../users/users.service';

describe('Item', () => {
  let controller: ItemsController;
  let service: ItemsService;
  let appsService: AppsService;
  let usersService: UsersService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await createTestingModule(
      [ItemsService, ItemsController],
      [AppModule],
    );
    controller = module.get<ItemsController>(ItemsController);
    service = module.get<ItemsService>(ItemsService);
    appsService = module.get<AppsService>(AppsService);
    usersService = module.get<UsersService>(UsersService);
  });

  describe('createItem', () => {
    it('should create a new item into a database', async () => {
      const user = {
        name: 'Tom',
        email: 'Hello@gmail.com',
        password: 'passwordTest',
      };

      const newUser = await usersService.createUser(user);

      const app = {
        name: 'newApp',
        user_id: newUser.id,
      };

      const newApp = await appsService.createApp(app);

      const item = {
        name: 'Pasta',
        quantity: 2,
        app_user_id: 'Axel',
      }

      const newItem = await controller.createItem({ app: newApp } as any, item);

      const dbItems = await service.getAllAppUserItems(newApp.id ,newItem.app_user_id )
      expect(dbItems).toMatchObject([item]);
    });
  });
});
