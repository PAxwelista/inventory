"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemsController = void 0;
const common_1 = require("@nestjs/common");
const items_service_1 = require("./items.service");
const create_item_dto_1 = require("./dto/create-item.dto");
const apiKeyGuard_1 = require("../guard/apiKeyGuard");
let ItemsController = class ItemsController {
    itemsService;
    constructor(itemsService) {
        this.itemsService = itemsService;
    }
    createItem(req, item) {
        const app = req['app'];
        if (!app)
            throw new common_1.UnauthorizedException('UseGuard Error');
        return this.itemsService.createItem(item, app);
    }
    getAllAppUserItems(req, appUserId) {
        const app = req['app'];
        if (!app)
            throw new common_1.UnauthorizedException('UseGuard Error');
        return this.itemsService.getAllAppUserItems(app.id, appUserId);
    }
    softDelete(req, id) {
        const app = req['app'];
        if (!app)
            throw new common_1.UnauthorizedException('UseGuard Error');
        return this.itemsService.softDelete(id, app.id);
    }
    updateQty(req, id, quantity) {
        const app = req['app'];
        if (!app)
            throw new common_1.UnauthorizedException('UseGuard Error');
        return this.itemsService.updateQty(id, app.id, quantity);
    }
};
exports.ItemsController = ItemsController;
__decorate([
    (0, common_1.UseGuards)(apiKeyGuard_1.ApiKeyGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, create_item_dto_1.CreateItemDto]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "createItem", null);
__decorate([
    (0, common_1.UseGuards)(apiKeyGuard_1.ApiKeyGuard),
    (0, common_1.Get)('findWithAppUserId/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, String]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "getAllAppUserItems", null);
__decorate([
    (0, common_1.UseGuards)(apiKeyGuard_1.ApiKeyGuard),
    (0, common_1.Patch)('/softDelete/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, Number]),
    __metadata("design:returntype", void 0)
], ItemsController.prototype, "softDelete", null);
__decorate([
    (0, common_1.UseGuards)(apiKeyGuard_1.ApiKeyGuard),
    (0, common_1.Patch)('/updateQty/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)('quantity')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, Number, Number]),
    __metadata("design:returntype", void 0)
], ItemsController.prototype, "updateQty", null);
exports.ItemsController = ItemsController = __decorate([
    (0, common_1.Controller)('items'),
    __metadata("design:paramtypes", [items_service_1.ItemsService])
], ItemsController);
//# sourceMappingURL=items.controller.js.map