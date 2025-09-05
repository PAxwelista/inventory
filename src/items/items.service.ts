import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './item.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private itemsRepository: Repository<Item>,
  ) {}

  getAll(): Promise<Item[]> {
    return this.itemsRepository.find();
  }
  createItem(item:Partial<Item>): Promise<Item> {
    const newItem = this.itemsRepository.create(item)
    return this.itemsRepository.save(newItem)
  }
}
