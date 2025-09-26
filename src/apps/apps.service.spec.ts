import { Test, TestingModule } from '@nestjs/testing';
import { AppsService } from './apps.service';
import { App } from './app.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';

describe('AppsService', () => {
  let service: AppsService;
  let repository: Repository<App>;

  const mockApp = {
    id: 1,
    name: 'test',
    user_id: 1,
  };

  const mockRepository = {
    save: jest.fn().mockResolvedValue(mockApp),
    create: jest.fn().mockResolvedValue(mockApp),
    find: jest.fn().mockResolvedValue([mockApp]),
  };

  const mockUsersService = {
    findOneById: jest.fn().mockResolvedValue(1),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppsService,
        { provide: getRepositoryToken(App), useValue: mockRepository },
        { provide: UsersService, useValue: mockUsersService },
      ],
    }).compile();

    service = module.get<AppsService>(AppsService);
    repository = module.get<Repository<App>>(getRepositoryToken(App));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createApp', () => {
    it('should create a new App', async () => {
      const dtoName = { name: 'newApp' };
      const dtoUserId = 1;
      const app = await service.createApp(dtoName, dtoUserId);

      expect(app).toEqual(mockApp);
      expect(mockRepository.create).toHaveBeenCalledWith(
        expect.objectContaining(dtoName),
      );
      expect(mockRepository.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('getUserApps', () => {
    it('should get user apps', async () => {
      const dtoUserId = 1;
      const app = await service.getUserApps(dtoUserId);

      expect(app).toEqual([mockApp]);
      expect(mockRepository.find).toHaveBeenCalledWith({
        where: { user: { id: dtoUserId } },
      });
    });
  });
});
