import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AddRoleDto } from './dto/add-role.dto';
import { CreateUserDto, UpdateUserDto } from '../auth/dto/create-user.dto';
import { UsersService } from './users.service';
import { Roles } from 'src/auth/decorators/roles-auth.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('users')
@ApiBearerAuth()
@ApiTags('Пользователи')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Получить всех пользователей' })
  @ApiResponse({ status: 200, type: [CreateUserDto] })
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить пользователя по ID' })
  @ApiResponse({ status: 200, type: CreateUserDto })
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  getUserById(@Param('id') id: number) {
    return this.usersService.getUserById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Изменить пользователя' })
  @ApiResponse({ status: 200, type: UpdateUserDto })
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  updateUserById(@Param('id') id: number, @Body() dto: UpdateUserDto) {
    return this.usersService.updateUserById(id, dto);
  }

  @Post('/role')
  @ApiOperation({ summary: 'Добавить роль пользователю' })
  @ApiResponse({ status: 200 })
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  addRole(@Body() dto: AddRoleDto) {
    return this.usersService.addRole(dto);
  }
}
