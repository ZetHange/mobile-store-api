import { forwardRef, Module } from '@nestjs/common';
import { AppsService } from './apps.service';
import { AppsController } from './apps.controller';
import { App } from './models/apps.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Tag } from 'src/tags/models/tags.model';
import { AppTags } from 'src/tags/models/app-tags.model';
import { TagsModule } from 'src/tags/tags.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [AppsService],
  controllers: [AppsController],
  imports: [
    SequelizeModule.forFeature([App, Tag, AppTags]),
    forwardRef(() => AuthModule),
    TagsModule,
  ],
})
export class AppsModule {}
