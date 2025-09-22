import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  UnauthorizedException,
  Get,
  Patch,
  Param,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from './item.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { ApiKeyGuard } from '../guard/apiKey.guard';

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
  @Get('findWithAppUserId/:id')
  getAllAppUserItems(@Req() req: Request, @Param('id') appUserId:string): Promise<Item[]> {
    const app = req['app'];
    if (!app) throw new UnauthorizedException('UseGuard Error');

    return this.itemsService.getAllAppUserItems(app.id,appUserId);
  }

  @UseGuards(ApiKeyGuard)
  @Patch('/softDelete/:id')
  softDelete(@Req() req: Request,@Param('id') id:number){
    const app = req['app'];
    if (!app) throw new UnauthorizedException('UseGuard Error');
    
    return this.itemsService.softDelete(id,app.id)
  }

  @UseGuards(ApiKeyGuard)
  @Patch('/updateQty/:id')
  updateQty(@Req() req: Request,@Param('id') id:number , @Body('quantity') quantity:number){
    const app = req['app'];
    if (!app) throw new UnauthorizedException('UseGuard Error');
    
    return this.itemsService.updateQty(id,app.id,quantity)
  }


}
