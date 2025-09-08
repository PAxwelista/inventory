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
    private itemsRepository: Repository<User>,
  ) {}

  async createUser(user: CreateUserDto): Promise<User> {
    const hashPassword = await bcrypt.hash(user.password, 10);

    const newUser = this.itemsRepository.create({
      ...user,
      password: hashPassword,
    });
    return this.itemsRepository.save(newUser);
  }
}
