import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateAppDto } from './dto/create-app.dto';
import { App } from './models/apps.model';

@Injectable()
export class AppsService {
  constructor(@InjectModel(App) private appsRepository: typeof App) {}
  newDate = new Date().toISOString();

  async getAllApps() {
    console.log(`${this.newDate} - выполнение: получение всех приложений`);

    const users = await this.appsRepository.findAll({ include: { all: true } });
    return users;
  }

  async createApp(dto: CreateAppDto) {
    console.log(
      `${this.newDate} - выполнение: создание нового прилжения (${dto.title})`,
    );
    const errorResponse = {
      error: {},
    };

    const appByTitle = this.appsRepository.findOne({
      where: { title: dto.title },
    });
    if (appByTitle) {
      errorResponse.error['title'] = `${dto.title} уже существует`;
      throw new HttpException(errorResponse, HttpStatus.UNPROCESSABLE_ENTITY);
    } else {
      return await this.appsRepository.create(dto);
    }
  }

  async getAppByTitle(title: string) {
    console.log(
      `${this.newDate} - выполнение: получение приложения по названию (${title})`,
    );

    const app = await this.appsRepository.findOne({
      where: {
        title,
      },
    });
    if (app) {
      return app;
    } else {
      throw new HttpException(
        `Приложение <${title}> не найдено`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
