import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './models/roles.model';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private rolesRepository: typeof Role) {}
  newDate = new Date().toISOString();

  async getAllRoles(): Promise<Role[]> {
    console.log(`${this.newDate} - выполнение: получение всех ролей`);
    return await this.rolesRepository.findAll({ include: ['users'], order: ['id'] });
  }

  async createRole(dto: CreateRoleDto) {
    console.log(
      `${this.newDate} - выполнение: создание новой роли ${dto.title}`,
    );

    const errorResponse = {
      error: {},
    };

    const role = await this.rolesRepository.findOne({
      where: {
        title: dto.title,
      } 
    });

    if (role) {
      errorResponse.error['title'] = `Роль ${dto.title} уже существует`;
      throw new HttpException(errorResponse, HttpStatus.UNPROCESSABLE_ENTITY);
    } else {
      return await this.rolesRepository.create(dto);
    }
  }

  async getRoleById(id: number) {
    console.log(`${this.newDate} - выполнение: получение роли с ID ${id}`);

    const errorResponse = {
      error: {},
    };

    const role = await this.rolesRepository.findOne({
      where: {
        id,
      },
      include: ['users'],
    });

    if (role) {
      return role;
    } else {
      errorResponse.error['id'] = `Роли с ID ${id} не найдено`;
      throw new HttpException(errorResponse, HttpStatus.NOT_FOUND);
    }
  }

  async getRoleByTitle(title: string) {
    console.log(
      `${this.newDate} - выполнение: получение роли с именем ${title}`,
    );

    const errorResponse = {
      error: {},
    };

    const role = await this.rolesRepository.findOne({
      where: {
        title,
      },
      include: ['users'],
    });

    if (role) {
      return role;
    } else {
      errorResponse.error['id'] = `Роли с именем ${title} не найдено`;
      throw new HttpException(errorResponse, HttpStatus.NOT_FOUND);
    }
  }
}
