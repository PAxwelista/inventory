import { TestingModule } from '@nestjs/testing';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { createTestingModule } from '../../test/utils/test-utils';
import { AppModule } from '../apps/apps.module';

describe('Item', () => {
  let controller: ItemsController;
  let service: ItemsService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await createTestingModule(
      [ItemsService, ItemsController],
      [AppModule],
    );
    controller = module.get<ItemsController>(ItemsController);
    service = module.get<ItemsService>(ItemsService);
  });


  describe('createItem',  () => {
    it('should create a new item',async () => {
      const item = await controller.createItem(
        {
          app: {
            name: 'newApp',
          },
        } as any,
        { name: 'Pasta', quantity: 2, app_user_id: 'Axel' },
      );
      expect(item).toBe(4);
    });
  });
});
