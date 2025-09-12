import { Repository } from 'typeorm';
import { App } from './app.entity';
import { CreateAppDto } from './dto/create-app.dto';
import { UsersService } from '../users/users.service';
export declare class AppsService {
    private appsRepository;
    private readonly usersService;
    constructor(appsRepository: Repository<App>, usersService: UsersService);
    createApp(app: CreateAppDto): Promise<App>;
    findByApiKey(apiKey: string): Promise<App | null>;
}
