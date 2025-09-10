import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './item.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { App } from '../apps/app.entity';
import { IsNull } from 'typeorm';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private itemsRepository: Repository<Item>,
  ) {}

  createItem(item: CreateItemDto, app: App): Promise<Item> {
    const newItem = this.itemsRepository.create({ ...item, app });
    return this.itemsRepository.save(newItem);
  }

  getAllAppUserItems(appId: number, appUserId: string): Promise<Item[]> {
    return this.itemsRepository.find({
      where: {
        app: { id: appId },
        app_user_id: appUserId,
        delete_at: IsNull(),
      },
    });
  }

  async softDelete(itemId: number, appId: number): Promise<Item> {
    const item = await this.itemsRepository.findOne({
      where: { id: itemId, app: { id: appId }, delete_at: IsNull() },
    });
    if (!item) throw new NotFoundException('Item not found or already delete');
    item.delete_at = new Date();
    return await this.itemsRepository.save(item);
  }

  async updateQty(
    itemId: number,
    appId: number,
    newQty: number,
  ): Promise<Item> {
    const item = await this.itemsRepository.findOne({
      where: { id: itemId, app: { id: appId }, delete_at: IsNull() },
    });
    if (!item) throw new NotFoundException('Item not found or already delete');
    item.quantity = newQty;
    return await this.itemsRepository.save(item);
  }
}
