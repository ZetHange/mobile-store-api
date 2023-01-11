import { Module } from '@nestjs/common';
import { AppsService } from './apps.service';
import { AppsController } from './apps.controller';
import { App } from './models/apps.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  providers: [AppsService],
  controllers: [AppsController],
  imports: [SequelizeModule.forFeature([App])],
})
export class AppsModule {}
