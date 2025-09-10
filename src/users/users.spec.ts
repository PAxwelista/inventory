import { createTestingModule } from '../../test/utils/test-utils';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TestingModule } from '@nestjs/testing';

describe('Users', () => {
  let service: UsersService;
  let controller: UsersController;
  let module: TestingModule;

  beforeAll(async () => {
    module = await createTestingModule([UsersService, UsersController]);
    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
    
  });

  describe('createUser', () => {
    it('should add a new user into the database', async () => {
      const newItem = await controller.createUser({
        name: 'A',
        email: 'at@afz.com',
        password: 'test',
      });
      expect(newItem.id).toBeDefined();
      expect(newItem.name).toBe('A');
      const dbUser = await service.findOneById(1)
      expect(dbUser).toEqual(newItem)
    });

    it('should have a crypt password', async () => {
      const newItem = await controller.createUser({
        name: 'A',
        email: 'at@afz.com',
        password: 'test',
      });
      expect(newItem.password).not.toBe('test');
    });
  });
});
