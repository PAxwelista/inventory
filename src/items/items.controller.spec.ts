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
    getAllAppUserItems : jest.fn().mockResolvedValue([mockItem])
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
  
  describe ('createItem' , ()=>{
    it('should should create a new item', async () => {
      
      const dto = { name: 'Pizza', quantity: 3, app_user_id: 'Axel' };
      const item = await controller.createItem(mockReq as any, dto);
  
      expect(item).toEqual(mockItem);
      expect(mockItemsService.createItem).toHaveBeenCalledWith(dto,mockReq.app)
    });
  })

  describe('getAllAppUserItems' , ()=>{
    it('should find all app user items' , async()=>{
      const dto = {id: "test"}
      const items = await controller.getAllAppUserItems(mockReq as any,dto)

      expect(items).toEqual([mockItem])
      expect(mockItemsService.getAllAppUserItems).toHaveBeenCalledWith(mockReq.app.id,dto.id)
    })
  })
 
});
