import { INestApplication } from '@nestjs/common';
import { createTestingModule } from '../../test/utils/test-utils';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TestingModule } from '@nestjs/testing';
import request from 'supertest';

describe('Users', () => {
  let service: UsersService;
  let controller: UsersController;
  let module: TestingModule;
  let application: INestApplication;

  beforeAll(async () => {
    module = await createTestingModule([UsersService], [UsersController]);
    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
    application = module.createNestApplication();
    await application.init();
  });

  afterAll(() => {
    application.close();
  });

  describe('createUser', () => {
    const item = {
      name: 'A',
      email: 'at@afz.com',
      password: 'test',
    };
    it('should add a new user into the database', async () => {
      const response = await request(application.getHttpServer())
        .post('/users')
        .send(item)
        .expect(201);
      const newUser = response.body;
      expect(newUser.id).toBeDefined();
      expect(newUser.name).toBe(item.name);
      const dbUser = await service.findOneById(newUser.id);
      expect(dbUser).toMatchObject({...newUser , created_at : new Date(newUser.created_at)});
    });

    it('should have a crypt password', async () => {
      const response = await request(application.getHttpServer())
        .post('/users')
        .send(item)
        .expect(201);
        const newItem = response.body
      expect(newItem.password).not.toBe('test');
    });
  });
});
