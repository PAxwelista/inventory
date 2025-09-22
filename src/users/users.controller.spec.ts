import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { generate } from 'rxjs';

describe('usersController', () => {
  let controller: UsersController;

  const mockUser = {
    id: 1,
    name: 'Axel',
    password: 'z',
    email: 'madotto.axel@gmail.com',
  };

  const jwt = "testJwt"

  const mockService = {
    signup: jest.fn().mockResolvedValue(mockUser),
    signin: jest.fn().mockResolvedValue(mockUser),
    generateJwt : jest.fn().mockResolvedValue(jwt)
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: mockService }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should signup', async () => {
    const dto = { username: 'Tom', password: 'ea', email: 'axel@gmail.com' };
    const user = await controller.signup(dto);
    expect(user).toBe(jwt);
    expect(mockService.signup).toHaveBeenCalledWith(dto);
  });
  it('should signin', async () => {
    const dto = { username: 'Tom', password: 'ea'};
    const user = await controller.signin(dto);
    expect(user).toBe(jwt);
    expect(mockService.signin).toHaveBeenCalledWith(dto);
  });
});
