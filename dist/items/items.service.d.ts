import { Repository } from 'typeorm';
import { Item } from './item.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { App } from '../apps/app.entity';
export declare class ItemsService {
    private itemsRepository;
    constructor(itemsRepository: Repository<Item>);
    createItem(item: CreateItemDto, app: App): Promise<Item>;
    getAllAppUserItems(appId: number, appUserId: string): Promise<Item[]>;
    softDelete(itemId: number, appId: number): Promise<Item>;
    updateQty(itemId: number, appId: number, newQty: number): Promise<Item>;
}
