import { App } from '../apps/app.entity';
export declare class User {
    id: number;
    name: string;
    email: string;
    password: string;
    apps: App[];
    created_at: Date;
}
