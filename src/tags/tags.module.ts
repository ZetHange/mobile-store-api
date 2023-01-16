import { forwardRef, Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { AppTags } from './models/app-tags.model';
import { Tag } from './models/tags.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { App } from 'src/apps/models/apps.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [TagsService],
  controllers: [TagsController],
  imports: [
    SequelizeModule.forFeature([App, Tag, AppTags]),
    AuthModule,
  ],
  exports: [TagsService],
})
export class TagsModule {}
