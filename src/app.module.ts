import { Module } from '@nestjs/common';
import { AppsModule } from './apps/apps.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { App } from './apps/models/apps.model';
import { UsersModule } from './users/users.module';
import { User } from './users/models/users.model';

@Module({
  imports: [
    AppsModule,
    ConfigModule.forRoot({
      envFilePath: `.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRESS_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRESS_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadModels: true,
      models: [App, User]
    }),
    UsersModule,
  ],
})
export class AppModule {}
