import { INestApplication } from '@nestjs/common';
import { createTestingModule } from '../../test/utils/test-utils';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TestingModule } from '@nestjs/testing';
import request from 'supertest';
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
    const user = {
      username: 'A',
      email: 'at@afz.com',
      password: 'test',
    };
    const user2 = {
      username: 'A',
      email: 'ataf@afz.com',
      password: 'test',
    };
    const user3 = {
      username: 'Axel',
      email: 'at@afz.com',
      password: 'test',
    };
    const user4 = {
      username: 'Axel',
      email: 'ataf@afz.com',
      password: 'test',
    };

    it('should add a new user into the database', async () => {
      await request(application.getHttpServer())
        .post('/users/signup')
        .send(user)
        .expect(201);
      const newUser = await service.findOneById(1);
      if (!newUser) return;
      expect(newUser.id).toBeDefined();
      expect(newUser.username).toBe(user.username);
      const dbUser = await service.findOneById(newUser.id);
      expect(dbUser).toMatchObject({
        ...newUser,
        created_at: new Date(newUser.created_at),
      });
    });

    it('should have a crypt password', async () => {
      const newUser = await service.findOneById(1);

      expect(newUser?.password).not.toBe(user.password);
    });

    it('should not create a user with a already used username', async () => {
      await request(application.getHttpServer())
        .post('/users/signup')
        .send(user2)
        .expect(409);
    });

    it('should not create a user with a already used email', async () => {
      await request(application.getHttpServer())
        .post('/users/signup')
        .send(user3)
        .expect(409);
    });
    it('should create the second user', async () => {
      await request(application.getHttpServer())
        .post('/users/signup')
        .send(user4)
        .expect(201);
    });
  });
});
