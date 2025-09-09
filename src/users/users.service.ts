import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';

import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUser(user: CreateUserDto): Promise<User> {
    const hashPassword = await bcrypt.hash(user.password, 10);

    const newUser = this.usersRepository.create({
      ...user,
      password: hashPassword,
    });
    return this.usersRepository.save(newUser);
  }

  async findOneById(id: number): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }
}
