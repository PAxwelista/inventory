import { CanActivate, ExecutionContext } from '@nestjs/common';
import { AppsService } from '../apps/apps.service';
export declare class ApiKeyGuard implements CanActivate {
    private readonly appsService;
    constructor(appsService: AppsService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
