import { Controller, Get, Post, Body } from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from './item.entity';
import { CreateItemDto } from './dto/create-item.dto';

@Controller('item')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  findAll(): Promise<Item[]> {
    return this.itemsService.getAll();
  }

  @Post()
  create(@Body() itemData: CreateItemDto): Promise<Item> {
    return this.itemsService.createItem(itemData);
  }
}
