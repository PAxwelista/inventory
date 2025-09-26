import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { App } from './app.entity';
import { AppsService } from './apps.service';
import { CreateAppDto } from './dto/create-app.dto';
import { AuthGuard } from '../guard/auth.guard';

@Controller('apps')
export class AppsController {
  constructor(private readonly appsService: AppsService) {}

  @UseGuards(AuthGuard)
  @Post()
  createApp(@Req() req: Request, @Body() appData: CreateAppDto): Promise<App> {
    const user = req['user'];
    return this.appsService.createApp(appData, user.sub);
  }

  @UseGuards(AuthGuard)
  @Get()
  getAppById(@Req() req: Request): Promise<App[]> {
    const user = req['user'];
    return this.appsService.getUserApps(user.sub);
  }
}
