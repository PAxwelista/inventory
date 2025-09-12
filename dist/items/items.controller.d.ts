import { ItemsService } from './items.service';
import { Item } from './item.entity';
import { CreateItemDto } from './dto/create-item.dto';
export declare class ItemsController {
    private readonly itemsService;
    constructor(itemsService: ItemsService);
    createItem(req: Request, item: CreateItemDto): Promise<Item>;
    getAllAppUserItems(req: Request, appUserId: string): Promise<Item[]>;
    softDelete(req: Request, id: number): Promise<Item>;
    updateQty(req: Request, id: number, quantity: number): Promise<Item>;
}
