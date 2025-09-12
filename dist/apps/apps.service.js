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
exports.AppsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const app_entity_1 = require("./app.entity");
const crypto_1 = require("crypto");
const users_service_1 = require("../users/users.service");
let AppsService = class AppsService {
    appsRepository;
    usersService;
    constructor(appsRepository, usersService) {
        this.appsRepository = appsRepository;
        this.usersService = usersService;
    }
    async createApp(app) {
        const user = await this.usersService.findOneById(app.user_id);
        if (!user) {
            throw new common_1.BadRequestException('UserdId invalid');
        }
        const apiKey = (0, crypto_1.randomBytes)(32).toString('hex');
        const newApp = this.appsRepository.create({ ...app, api_key: apiKey, user });
        return this.appsRepository.save(newApp);
    }
    async findByApiKey(apiKey) {
        return this.appsRepository.findOneBy({ api_key: apiKey });
    }
};
exports.AppsService = AppsService;
exports.AppsService = AppsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(app_entity_1.App)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        users_service_1.UsersService])
], AppsService);
//# sourceMappingURL=apps.service.js.map