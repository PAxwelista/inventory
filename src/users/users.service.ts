import { Injectable,ForbiddenException } from '@nestjs/common';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';

import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';

import { InjectRepository } from '@nestjs/typeorm';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signup(user: SignupDto): Promise<User> {
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

  async signin(user: SigninDto): Promise<User> {
    const userFind = await this.usersRepository.findOne({
      where: { username: user.username },
    });

    if (!userFind) throw new ForbiddenException('Username or password uncorrect');

    const isPasswordValid = await bcrypt.compare(user.password, userFind.password);

    if (!isPasswordValid) throw new ForbiddenException('Username or password uncorrect');

    return userFind;
  }

  async generateJwt(user : User) : Promise<string> {

    const payload = {username:user.username , sub :user.id}

    return this.jwtService.signAsync(payload)

  }
}
