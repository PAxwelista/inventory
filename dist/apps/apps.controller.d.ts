import { App } from './app.entity';
import { AppsService } from './apps.service';
import { CreateAppDto } from './dto/create-app.dto';
export declare class AppsController {
    private readonly appsService;
    constructor(appsService: AppsService);
    createApp(appData: CreateAppDto): Promise<App>;
}
