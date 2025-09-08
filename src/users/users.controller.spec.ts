import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('usersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockUser = {
    id: 1,
    name: 'Axel',
    password: 'z',
    email: 'madotto.axel@gmail.com',
  };

  const mockService = {
    createUser: jest.fn().mockResolvedValue(mockUser),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: mockService }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should create a user', async () => {
    const dto = { name: 'Tom', password: 'ea', email: 'axel@gmail.com' };
    const user = await controller.createUser(dto);
    expect(user).toEqual(mockUser);
    expect(mockService.createUser).toHaveBeenCalledWith(dto);
  });
});
