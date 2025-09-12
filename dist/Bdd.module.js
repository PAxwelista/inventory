"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BddModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const item_entity_1 = require("./items/item.entity");
const items_module_1 = require("./items/items.module");
const user_entity_1 = require("./users/user.entity");
const app_entity_1 = require("./apps/app.entity");
const users_module_1 = require("./users/users.module");
const apps_module_1 = require("./apps/apps.module");
let BddModule = class BddModule {
};
exports.BddModule = BddModule;
exports.BddModule = BddModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.DB_HOST,
                port: Number(process.env.DB_PORT),
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
                entities: [item_entity_1.Item, user_entity_1.User, app_entity_1.App],
                synchronize: true,
            }),
            items_module_1.ItemModule,
            users_module_1.UserModule,
            apps_module_1.AppModule
        ],
    })
], BddModule);
//# sourceMappingURL=Bdd.module.js.map