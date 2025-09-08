import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  const mockUser = {
    id: 1,
    name: 'Axel',
    password: 'z',
    email: 'madotto.axel@gmail.com',
  };

  const mockRepository = {
    save: jest.fn().mockResolvedValue(mockUser),
    create: jest.fn().mockResolvedValue(mockUser),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should create a user', async () => {
    const dto = { name: 'Tom', password: 'ea', email: 'axel@gmail.com' };
    const user = await service.createUser(dto);

    expect(user).toEqual(
      expect.objectContaining({
        id: 1,
        name: 'Axel',
        email: 'madotto.axel@gmail.com',
      }),
    );

    expect(repository.create).toHaveBeenCalledWith(expect.objectContaining({
      name: 'Tom',
      email: 'axel@gmail.com',
    }))
    expect(repository.create).not.toHaveBeenCalledWith(expect.objectContaining({
      password: 'ea',
    }))
    expect(repository.save).toHaveBeenCalled();
  });
});
