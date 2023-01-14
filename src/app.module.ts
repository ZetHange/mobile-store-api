import { Module } from '@nestjs/common';
import { AppsModule } from './apps/apps.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { App } from './apps/models/apps.model';
import { UsersModule } from './users/users.module';
import { User } from './users/models/users.model';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/models/roles.model';
import { UserRoles } from './roles/models/user-roles.model';

@Module({
  imports: [
    AppsModule,
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
      models: [App, User, Role, UserRoles]
    }),
    UsersModule,
    AuthModule,
    RolesModule,
  ],
})
export class AppModule {}
