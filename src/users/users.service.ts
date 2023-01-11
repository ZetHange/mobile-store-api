import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './models/users.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private usersRepository: typeof User) {}
  newDate = new Date().toISOString();

  async getAllUsers() {
    console.log(`${this.newDate} - выполнение: получение всех пользователей`);

    const users = await this.usersRepository.findAll();
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

    const user = await this.usersRepository.create(dto);
    return user;
  }
}
