import { App } from '../apps/app.entity';
export declare class Item {
    id: number;
    app: App;
    app_user_id: string;
    name: string;
    quantity: number;
    options: Record<string, any> | null;
    created_at: Date;
    delete_at: Date | null;
}
