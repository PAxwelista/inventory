import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  UnauthorizedException,
  Get,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from './item.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { ApiKeyGuard } from '../guard/apiKeyGuard';
import { GetAllAppUserItemsDto } from './dto/get-all-app-user-items.dto';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @UseGuards(ApiKeyGuard)
  @Post()
  createItem(@Req() req: Request, @Body() item: CreateItemDto): Promise<Item> {
    const app = req['app'];
    if (!app) throw new UnauthorizedException('UseGuard Error');

    return this.itemsService.createItem(item, app);
  }

  @UseGuards(ApiKeyGuard)
  @Get()
  getAllAppUserItems(@Req() req: Request, @Body() appUser:GetAllAppUserItemsDto): Promise<Item[]> {
    const app = req['app'];
    if (!app) throw new UnauthorizedException('UseGuard Error');

    return this.itemsService.getAllAppUserItems(app.id,appUser.id);
  }
}
