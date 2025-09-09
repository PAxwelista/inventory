import { Test, TestingModule } from '@nestjs/testing';
import { AppsController } from './apps.controller';
import { AppsService } from './apps.service';

describe('usersController', () => {
  let controller: AppsController;

  const mockUser = {
    id: 1,
    name: 'AppTest',
    user_id: 2,
  };

  const mockService = {
    createApp: jest.fn().mockResolvedValue(mockUser),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppsController],
      providers: [{ provide: AppsService, useValue: mockService }],
    }).compile();

    controller = module.get<AppsController>(AppsController);
  });

  it('should be defined', async () => {
    expect(controller).toBeDefined();
  });
  it('should create a app', async () => {
    const dto = { name: 'Tom', user_id: 1 };
    const app = await controller.createApp(dto);

    expect(app).toEqual(mockUser);
    expect(mockService.createApp).toHaveBeenCalledWith(dto);
  });
});
