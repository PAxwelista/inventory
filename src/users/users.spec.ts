import { INestApplication } from '@nestjs/common';
import { createTestingModule } from '../../test/utils/test-utils';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../apps/apps.module';
import { UserModule } from './users.module';
import { JwtModule } from '@nestjs/jwt';

describe('Users', () => {
  let service: UsersService;
  let controller: UsersController;
  let module: TestingModule;
  let application: INestApplication;

  beforeAll(async () => {
    module = await createTestingModule(
      [UsersService],
      [UsersController],
      [
        UserModule,

        JwtModule.register({
          global: true,
          secret: 'test-secret',
          signOptions: { expiresIn: '1h' },
        }),
      ],
    );
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
      username: 'A',
      email: 'at@afz.com',
      password: 'test',
    };
    it('should add a new user into the database', async () => {
      await request(application.getHttpServer())
        .post('/users/signup')
        .send(item)
        .expect(201);
      const newUser = await service.findOneById(1);
      if (!newUser) return;
      expect(newUser.id).toBeDefined();
      expect(newUser.username).toBe(item.username);
      const dbUser = await service.findOneById(newUser.id);
      expect(dbUser).toMatchObject({
        ...newUser,
        created_at: new Date(newUser.created_at),
      });
    });

    it('should have a crypt password', async () => {
      const response = await request(application.getHttpServer())
        .post('/users/signup')
        .send(item)
        .expect(201);
      const newItem = response.body;
      expect(newItem.password).not.toBe('test');
    });
  });
});
