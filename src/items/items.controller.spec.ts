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

  const mockAppUserId = [...new Set (mockItems.map(mockItem=>mockItem.app_user_id))
]
  const mockItemsService = {
    createItem: jest.fn().mockResolvedValue(mockItem),
    getAllAppUserItems: jest.fn().mockResolvedValue(mockItems),
    softDelete: jest.fn().mockResolvedValue(mockItem),
    updateQty: jest.fn().mockResolvedValue(mockItem),
    getAllAppUserId : jest.fn().mockResolvedValue(mockAppUserId),
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

  const mockReq = { app: { id: 1, name: 'app' } };

  it('should be defined', async () => {
    expect(controller).toBeDefined();
  });

  describe('createItem', () => {
    it('should should create a new item', async () => {
      const dto = { name: 'Pizza', quantity: 3, app_user_id: 'Axel' };
      const item = await controller.createItem(mockReq as any, dto);

      expect(item).toEqual(mockItem);
      expect(mockItemsService.createItem).toHaveBeenCalledWith(
        dto,
        mockReq.app,
      );
    });
  });

  describe('getAllAppUserItems', () => {
    it('should find all app user items', async () => {
      const dto = 'test' ;
      const items = await controller.getAllAppUserItems(mockReq as any, dto);

      expect(items).toEqual(mockItems);
      expect(mockItemsService.getAllAppUserItems).toHaveBeenCalledWith(
        mockReq.app.id,
        dto,
      );
    });
  });

  describe('getAllAppUserid', () => {
    it('should find all app user id', async () => {
      
      const items = await controller.getAllAppUserId(mockReq as any);

      expect(items).toEqual(mockAppUserId);
      expect(mockItemsService.getAllAppUserId).toHaveBeenCalledWith(
        mockReq.app.id
      );
    });
  });

  describe('softDelete', () => {
    it('should update delete_at', async () => {
      const itemId = 2;
      const item = await controller.softDelete(mockReq as any, itemId);

      expect(item).toEqual(mockItem);
      expect(mockItemsService.softDelete).toHaveBeenCalledWith(
        itemId,
        mockReq.app.id,
      );
    });
  });

  describe('updateQty' , ()=>{
    it('should update the quantity' , async()=>{
      
      const itemId = 2;
      const newItemQty = 29;
      const item = await controller.updateQty(mockReq as any, itemId,newItemQty)

      expect(item).toEqual(mockItem)
      expect(mockItemsService.updateQty).toHaveBeenCalledWith(
        itemId,
        mockReq.app.id,
        newItemQty
      );
    })
  })
});
