import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './item.entity'
import { CreateItemDto } from './dto/create-item.dto';
import { App } from '../apps/app.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private itemsRepository: Repository<Item>,
  ) {}
  

  createItem(item: CreateItemDto,app : App): Promise<Item> {
    const newItem = this.itemsRepository.create({...item , app});
    return this.itemsRepository.save(newItem);
  }

  getAllAppUserItems(appId:number,appUserId:string) : Promise<Item[]>{
    return this.itemsRepository.find({where : {app : {id : appId} , app_user_id:appUserId}})
  }
}
