import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { App } from './app.entity';
import { AppsController } from './apps.controller';
import { AppsService } from './apps.service';
import { UserModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([App]), UserModule],
  controllers: [AppsController],
  providers: [AppsService],
  exports: [AppsService],
})
export class AppModule {}
