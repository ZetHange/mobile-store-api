import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AddRoleDto } from './dto/add-role.dto';
import { CreateUserDto, UpdateUserDto } from '../auth/dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
@ApiBearerAuth()
@ApiTags('Пользователи')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    @ApiOperation({summary: 'Получить всех пользователей'})
    @ApiResponse({ status: 200, type: [CreateUserDto] })
    getAllUsers() {
        return this.usersService.getAllUsers();
    }
    
    @Get(':id')
    @ApiOperation({summary: 'Получить пользователя по ID'})
    @ApiResponse({ status: 200, type: CreateUserDto })
    getUserById(@Param('id') id: number) {
        return this.usersService.getUserById(id);
    }

    @Put(':id')
    @ApiOperation({summary: 'Изменить пользователя'})
    @ApiResponse({ status: 200, type: UpdateUserDto })
    updateUserById(@Param('id') id: number, @Body() dto: UpdateUserDto) {
        return this.usersService.updateUserById(id, dto);
    }

    @Post('/role')
    @ApiOperation({summary: 'Добавить роль пользователю'})
    @ApiResponse({ status: 200 })
    addRole(@Body() dto: AddRoleDto) {
        return this.usersService.addRole(dto);
    }
}
