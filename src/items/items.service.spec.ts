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
    app_user_id: 'Tom',
  };

  const mockItems = [
    {
      id: 1,
      name: 'Apple',
      quantity: 1,
      app_user_id: 'Tom',
    },
    {
      id: 2,
      name: 'Carots',
      quantity: 24,
      app_user_id: 'Eric',
    },
  ];

  const mockRepository = {
    create: jest.fn().mockResolvedValue(mockItem),
    save: jest.fn().mockResolvedValue(mockItem),
    find: jest.fn().mockResolvedValue(mockItems),
    findOne: jest.fn().mockResolvedValue(mockItem),
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

  it('should bne defined', () => {
    expect(itemsService).toBeDefined();
  });

  describe('createItem', () => {
    it('should create a new item', async () => {
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

  describe('getAllAppUserItems', () => {
    it('should get all app user items', async () => {
      const appId = 4;
      const appUserId = 'axel';

      const items = await itemsService.getAllAppUserItems(appId, appUserId);

      expect(items).toEqual(mockItems);
      expect(mockRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('getAllAppUserId', () => {
    it('should get all appUserId', async () => {
      const appId = 4;

      const items = await itemsService.getAllAppUserId(appId);

      const appUserIds = [
        ...new Set(mockItems.map((mockItem) => mockItem.app_user_id)),
      ];

      expect(items).toEqual(appUserIds);
      expect(mockRepository.find).toHaveBeenCalledTimes(2);
    });
  });

  describe('softDelete', () => {
    it('should update delete_at', async () => {
      const item = await itemsService.softDelete(1, 1);

      expect(item).toEqual(mockItem);
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockRepository.save).toHaveBeenCalledTimes(2);
    });
  });
  describe('updateQty', () => {
    it('should update quantity', async () => {
      const item = await itemsService.updateQty(1, 1, 4);

      expect(item).toEqual(mockItem);
      expect(mockRepository.findOne).toHaveBeenCalledTimes(2);
      expect(mockRepository.save).toHaveBeenCalledTimes(3);
    });
  });
});
