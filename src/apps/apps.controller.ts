import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { App } from './app.entity';
import { AppsService } from './apps.service';
import { CreateAppDto } from './dto/create-app.dto';
import { ApiKeyGuard } from '../guard/apiKeyGuard';


@Controller('apps')
export class AppsController {
  constructor(private readonly appsService: AppsService) {}

  @Post()
  createApp(@Body() appData : CreateAppDto) : Promise<App>{
    return this.appsService.createApp(appData)
  }

//   @UseGuards(ApiKeyGuard)
//   @Get()
//   getAppById(@Req() req:Request) :string
// {
  
// }
}
