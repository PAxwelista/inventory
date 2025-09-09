import { TestingModule } from '@nestjs/testing';
import { AppsController } from './apps.controller';
import { AppsService } from './apps.service';
import { createTestingModule } from '../../test/utils/test-utils';
import { UserModule } from '../users/users.module';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('Apps', () => {
  let service: AppsService;
  let controller: AppsController;
  let module: TestingModule;

  beforeAll(async () => {
    module = await createTestingModule(
      [AppsService, AppsController ],
      [UserModule],
    );
    controller = module.get<AppsController>(AppsController);
    service = module.get<AppsService>(AppsService);

    const userRepository = module.get<Repository<User>>(getRepositoryToken(User))

    const user = userRepository.create({
        name:'here',
        email:'am@faa.com',
        password:'myPasswors'
    })

    await userRepository.save(user)


  });

  afterAll(async () => {
    await module.close();
  });

  describe('CreateApp', () => {
    it('should create a new app', async () => {
      const newApp = await controller.createApp({
        name: 'newApp',
        user_id: 1,
      });
      expect(newApp.user.id).toBe(1);
    });
  

  });
});
