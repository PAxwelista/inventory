import { Test, TestingModule } from '@nestjs/testing';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';

describe('InventoryController', () => {
  let itemController: ItemsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ItemsController],
      providers: [ItemsService],
    }).compile();

    itemController = app.get<ItemsController>(ItemsController);
  });

  describe('findAll', () => {
    it('should return something', () => {
      expect(itemController.findAll()).toBe('Hello World!');
    });
  });
  describe('create', () => {
    it('should return something', () => {
      expect(itemController.create()).toBe('Hello World!');
    });
  });
});
