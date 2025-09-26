import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { App } from './app.entity';
import { CreateAppDto } from './dto/create-app.dto';
import { randomBytes } from 'crypto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AppsService {
  constructor(
    @InjectRepository(App)
    private appsRepository: Repository<App>,
    private readonly usersService: UsersService,
  ) {}

  async createApp(app: CreateAppDto, userId: number): Promise<App> {
    const appUserId = userId;
    const user = await this.usersService.findOneById(appUserId);
    if (!user) {
      throw new BadRequestException('UserdId invalid');
    }
    const apiKey = randomBytes(32).toString('hex');
    const newApp = this.appsRepository.create({
      ...app,
      api_key: apiKey,
      user,
    });
    return this.appsRepository.save(newApp);
  }

  async findByApiKey(apiKey: string): Promise<App | null> {
    return this.appsRepository.findOneBy({ api_key: apiKey });
  }
  async getUserApps(userId: number): Promise<App[]> {
    return this.appsRepository.find({ where: { user: { id: userId } } });
  }
}
