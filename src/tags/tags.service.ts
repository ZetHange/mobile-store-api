import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTagDto } from './dto/create-tag.dto';
import { Tag } from './models/tags.model';

@Injectable()
export class TagsService {
  constructor(@InjectModel(Tag) private tagsRepository: typeof Tag) {}
  newDate = new Date().toISOString();

  async getAllTags() {
    console.log(`${this.newDate} - выполнение: получение всех тегов`);

    return await this.tagsRepository.findAll({
      include: ['apps'],
    });
  }

  async createTag(dto: CreateTagDto) {
    console.log(`${this.newDate} - выполнение: создание тега ${dto.title}`);
    const errorResponse = {
      error: {},
    };

    const tagFind = await this.tagsRepository.findOne({
      where: {
        title: dto.title,
      },
    });

    if (tagFind) {
      errorResponse.error['title'] = `${dto.title} уже существует`;
      throw new HttpException(errorResponse, HttpStatus.UNPROCESSABLE_ENTITY);
    } else {
      const tag = await this.tagsRepository.create(dto);
      return tag;
    }
  }

  async getTagById(id: number) {
    const tag = await this.tagsRepository.findByPk(id)
    return tag;
  }
}
