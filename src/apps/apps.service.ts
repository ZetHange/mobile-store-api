import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TagsService } from 'src/tags/tags.service';
import { AddTagsDto } from './dto/add-tags.dto';
import { CreateAppDto } from './dto/create-app.dto';
import { App } from './models/apps.model';

@Injectable()
export class AppsService {
  constructor(
    @InjectModel(App) private appsRepository: typeof App,
    private tagsService: TagsService,
  ) {}
  newDate = new Date().toISOString();

  async getAllApps() {
    console.log(`${this.newDate} - выполнение: получение всех приложений`);

    const users = await this.appsRepository.findAll({
      include: ['tags'],
      order: ['id'],
    });
    return users;
  }

  async deleteAppByTitle(title: string) {
    const app = await this.appsRepository.findOne({ where: { title } });
    if (app) {
      await this.appsRepository.destroy({ where: { title } });
    } else {
      throw new HttpException('Приложение не найдено', HttpStatus.NOT_FOUND);
    }
  }

  async createApp(dto: CreateAppDto) {
    console.log(
      `${this.newDate} - выполнение: создание нового приложения (${dto.title})`,
    );
    const errorResponse = {
      error: {},
    };

    const app = await this.appsRepository.findOne({
      where: {
        title: dto.title,
      },
    });

    if (app) {
      errorResponse.error['title'] = `${dto.title} уже существует`;
      throw new HttpException(errorResponse, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    if (!app) {
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

  async getAppById(id: number) {
    return await this.appsRepository.findByPk(id);
  }

  async addTag(dto: AddTagsDto) {
    console.log(
      `${this.newDate} - выполнение: добавление тега #${dto.tagId} приложению #${dto.appId}`,
    );

    const tag = await this.tagsService.getTagById(dto.tagId);
    const app = await this.getAppById(dto.appId);
    if (tag && app) {
      await app.$add('tags', tag.id);
      return dto;
    }
  }
}
