import { Module } from '@nestjs/common';
import * as path from "path";
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { AppsModule } from './apps/apps.module';
import { App } from './apps/models/apps.model';
import { UsersModule } from './users/users.module';
import { User } from './users/models/users.model';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/models/roles.model';
import { UserRoles } from './roles/models/user-roles.model';
import { TagsModule } from './tags/tags.module';
import { Tag } from './tags/models/tags.model';
import { AppTags } from './tags/models/app-tags.model';
import { DevelopersModule } from './developers/developers.module';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    ConfigModule.forRoot({
      envFilePath: `.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DB,
      autoLoadModels: true,
      models: [App, User, Role, UserRoles, Tag, AppTags],
    }),
    UsersModule,
    AuthModule,
    RolesModule,
    TagsModule,
    DevelopersModule,
    FilesModule,
    AppsModule,
  ],
})
export class AppModule {}
