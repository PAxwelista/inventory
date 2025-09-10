import { Test, TestingModule } from '@nestjs/testing';
import { ItemsService } from './items.service';
import { AppsService } from '../apps/apps.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Item } from './item.entity';
import { User } from '../users/user.entity';

describe('itemsService', () => {
  let itemsService: ItemsService;

  const mockAppsService = {
    findByApiKey: jest.fn().mockResolvedValue({}),
  };

  const mockItem = {
    id: 1,
    name: 'Apple',
    quantity: 1,
  };

  const mockRepository = {
    create: jest.fn().mockResolvedValue(mockItem),
    save: jest.fn().mockResolvedValue(mockItem),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemsService,
        { provide: getRepositoryToken(Item), useValue: mockRepository },
        { provide: AppsService, useValue: mockAppsService },
      ],
    }).compile();
    itemsService = module.get<ItemsService>(ItemsService);
  });

  it('should', async () => {
    const dtoApp = {
      id: 2,
      name: 'Cool app',
      api_key: 'one',
      items: [],
      user: new User(),
      created_at: new Date(),
    };
    const dtoItem = { name: 'Plant', quantity: 3, app_user_id: 'Tomas' };
    const item = await itemsService.createItem(dtoItem, dtoApp);

    expect(item).toBe(mockItem);
    expect(mockRepository.create).toHaveBeenCalledWith({
      ...dtoItem,
      app: dtoApp,
    });
    expect(mockRepository.save).toHaveBeenCalledTimes(1);
  });
});
