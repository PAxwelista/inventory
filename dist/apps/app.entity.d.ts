import { Item } from '../items/item.entity';
import { User } from '../users/user.entity';
export declare class App {
    id: number;
    name: string;
    api_key: string;
    items: Item[];
    user: User;
    created_at: Date;
}
