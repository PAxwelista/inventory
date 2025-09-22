import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

jest.mock('bcrypt');

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  const mockUser = {
    id: 1,
    username: 'Axel',
    password: 'z',
    email: 'madotto.axel@gmail.com',
  };

  const mockRepository = {
    save: jest.fn().mockResolvedValue(mockUser),
    create: jest.fn().mockResolvedValue(mockUser),
    findOne: jest
      .fn()
      .mockResolvedValueOnce(mockUser)
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce(mockUser),
  };

  const mockJwtService = {
    signAsync: jest.fn().mockReturnValue('fake-jwt'),
    verifyAsync: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        
        },{
          provide:JwtService,
          useValue:mockJwtService
        }
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('signup', () => {
    it('should create a user', async () => {
      const dto = { username: 'Tom', password: 'ea', email: 'axel@gmail.com' };
      const user = await service.signup(dto);

      expect(user).toEqual(
        expect.objectContaining({
          id: 1,
          username: 'Axel',
          email: 'madotto.axel@gmail.com',
        }),
      );

      expect(repository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          username: 'Tom',
          email: 'axel@gmail.com',
        }),
      );
      expect(repository.create).not.toHaveBeenCalledWith(
        expect.objectContaining({
          password: 'ea',
        }),
      );
      expect(repository.save).toHaveBeenCalled();
    });
    it('should find a user with her ID', async () => {
      const user = await service.findOneById(1);

      expect(user).toEqual(mockUser);
    });
    it('should return null if user not find', async () => {
      const user = await service.findOneById(2);

      expect(user).toBe(null);
    });
  });
  describe('signin', () => {
    it('should signin', async () => {
      bcrypt.compare.mockResolvedValue(true);

      const dto = { username: 'Tom', password: 'ea' };
      const user = await service.signin(dto);

      expect(user).toEqual(
        expect.objectContaining({
          id: 1,
          username: 'Axel',
        }),
      );

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { username: dto.username },
      });
    });
  });
});
