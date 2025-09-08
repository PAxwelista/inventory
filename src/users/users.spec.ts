import { createTestingModule } from '../../test/utils/test-utils';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TestingModule } from '@nestjs/testing';

describe('UsersController', () => {
  let usersService: UsersService;
  let usersController: UsersController;
  let module: TestingModule;

  beforeAll(async () => {
    module = await createTestingModule([UsersService, UsersController]);
    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  afterAll(async () => {
    await module.close();
  });

  describe('createUser', () => {
    it('should add a new user into the database', async () => {
      const newItem = await usersController.createUser({
        name: 'A',
        email: 'at@afz.com',
        password: 'test',
      });
      expect(newItem.id).toBeDefined();
      expect(newItem.name).toBe('A');
    });
  });
});
