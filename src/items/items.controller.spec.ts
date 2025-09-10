import { Test, TestingModule } from '@nestjs/testing';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { AppModule } from '../apps/apps.module';
import { AppsService } from '../apps/apps.service';

describe('itemsController', () => {
  let controller: ItemsController;

  const mockItem = {
    id: 1,
    name: 'Apple',
    quantity: 3,
    app_user_id: 'Tom',
  };

  const mockItemsService = {
    createItem: jest.fn().mockResolvedValue(mockItem),
  };
  const mockAppsService = {
    findByApiKey: jest.fn().mockResolvedValue({}),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemsController],
      providers: [
        { provide: ItemsService, useValue: mockItemsService },
        { provide: AppsService, useValue: mockAppsService },
      ],
    }).compile();

    controller = module.get<ItemsController>(ItemsController);
  });

  it('should be defined', async () => {
    expect(controller).toBeDefined();
  });

  it('should should create a new item', async () => {
    const mockReq = { app: { id: 1, name: 'app' } };
    const dto = { name: 'Pizza', quantity: 3, app_user_id: 'Axel' };
    const item = await controller.createItem(mockReq as any, dto);

    expect(item).toEqual(mockItem);
    expect(mockItemsService.createItem).toHaveBeenCalledWith(dto,mockReq.app)
  });
});
