import { TestingModule } from '@nestjs/testing';
import { AppsController } from './apps.controller';
import { AppsService } from './apps.service';
import { createTestingModule } from '../../test/utils/test-utils';
import { UserModule } from '../users/users.module';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from './app.entity';
import { UsersService } from '../users/users.service';
import { JwtModule } from '@nestjs/jwt';

describe('Apps', () => {
  let service: AppsService;
  let controller: AppsController;
  let module: TestingModule;
  let repository: Repository<App>;
  let application: INestApplication;
  let usersService: UsersService;

  beforeAll(async () => {
    module = await createTestingModule(
      [AppsService,UsersService],
      [AppsController],
      [

        JwtModule.register({
          global: true,
          secret: 'test-secret',
          signOptions: { expiresIn: '1h' }
        }),
      ],
    );
    controller = module.get<AppsController>(AppsController);
    service = module.get<AppsService>(AppsService);
    repository = module.get<Repository<App>>(getRepositoryToken(App));
    usersService = module.get<UsersService>(UsersService);
    application = module.createNestApplication();
    application.init();

    const userRepository = module.get<Repository<User>>(
      getRepositoryToken(User),
    );

    const user = userRepository.create({
      username: 'here',
      email: 'am@faa.com',
      password: 'myPasswors',
    });

    await userRepository.save(user);
  });

  afterAll(async () => {
    await application.close();
    await module.close();
  });

  describe('CreateApp', () => {
    const app = {
      name: 'newApp',
      user_id: 1,
    };
    it('should create a new app', async () => {

      const user = await usersService.signup({
        username: 'Axel',
        password: 'azerty',
        email: 'a@gmail.com',
      });

      const token = await usersService.generateJwt(user);

      const response = await request(application.getHttpServer())
        .post('/apps')
        .send(app)
        .set('Authorization', `Bearer ${token}`)
        .expect(201);
      const newApp = response.body;

      const dbApp = await repository.findOne({ where: { id: newApp.id } });

      expect(dbApp?.name).toBe(newApp.name);
      expect(dbApp?.id).toBe(newApp.id);
      expect(dbApp).toMatchObject({
        ...newApp,
        created_at: new Date(newApp.created_at),
        user: undefined,
      });
    });
  });
});
