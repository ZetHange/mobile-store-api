import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { CreateUserDto, UpdateUserDto } from './dto/create-user.dto';
import { User } from './models/users.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private usersRepository: typeof User,
              private rolesService: RolesService) {}
  newDate = new Date().toISOString();

  async getAllUsers() {
    console.log(`${this.newDate} - выполнение: получение всех пользователей`);

    const users = await this.usersRepository.findAll({ include: {all: true} });
    return users;
  }

  async getUserById(id: number) {
    console.log(
      `${this.newDate} - выполнение: получение пользователя с ID ${id}`,
    );

    const user = await this.usersRepository.findByPk(id);
    if (user) {
      return user;
    } else {
      throw new HttpException(
        `Пользователь с ID <${id}>`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async createUser(dto: CreateUserDto) {
    console.log(
      `${this.newDate} - выполнение: создание пользователя с именем ${dto.nickname}`,
    );

    const errorResponse = {
      errors: {},
    };

    const userByEmail = await this.usersRepository.findOne({
      where: { email: dto.email },
    });
    const userByNickname = await this.usersRepository.findOne({
      where: { nickname: dto.nickname },
    });

    if (userByEmail) {
      errorResponse.errors['email'] = `${dto.email} уже существует`;
    }
    if (userByNickname) {
      errorResponse.errors['nickname'] = `${dto.nickname} уже существует`;
    }
    if (userByEmail || userByNickname) {
      throw new HttpException(errorResponse, HttpStatus.UNPROCESSABLE_ENTITY);
    } else {      
      const user = await this.usersRepository.create(dto);
      const role = await this.rolesService.getRoleByTitle("ADMIN");
      await user.$set("roles", [role.id])
      return user;
    }
  }

  async updateUserById(id: number, dto: UpdateUserDto) {
    console.log(
      `${this.newDate} - выполнение: обновление пользователя с ID ${id}`,
    );

    const errorResponse = {
      errors: {},
    };

    const userById = await this.usersRepository.findOne({
      where: { id },
    });

    if (!userById) {
      errorResponse.errors['email'] = `Пользователя с ID ${id} не существует`;
      throw new HttpException(errorResponse, HttpStatus.UNPROCESSABLE_ENTITY);
    } else {
      await this.usersRepository.update(dto, { where: { id }});
      return this.usersRepository.findByPk(id);
    }
  }

  async addRole(dto: AddRoleDto) {
    console.log(
      `${this.newDate} - выполнение: добавление роли ${dto.roleTitle} пользователю с ID ${dto.userId}`,
    );

    const role = await this.rolesService.getRoleByTitle(dto.roleTitle);
    const user = await this.getUserById(dto.userId);
    if (role && user) {
      await user.$add('roles', role.id)
      return dto
    }
  }
}
