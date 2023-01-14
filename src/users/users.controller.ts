import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AddRoleDto } from './dto/add-role.dto';
import { CreateUserDto, UpdateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
@ApiBearerAuth()
@ApiTags('Пользователи')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    @ApiResponse({ status: 200, type: [CreateUserDto] })
    getAllUsers() {
        return this.usersService.getAllUsers();
    }
    
    @Get(':id')
    @ApiResponse({ status: 200, type: CreateUserDto })
    getUserById(@Param('id') id: number) {
        return this.usersService.getUserById(id);
    }

    @Put(':id')
    @ApiResponse({ status: 200, type: UpdateUserDto })
    updateUserById(@Param('id') id: number, @Body() dto: UpdateUserDto) {
        return this.usersService.updateUserById(id, dto);
    }

    @Post()
    @ApiResponse({ status: 200, type: CreateUserDto })
    createUser(@Body() dto: CreateUserDto) {
        return this.usersService.createUser(dto);
    }

    @Post()
    @ApiResponse({ status: 200 })
    addRole(@Body() dto: AddRoleDto) {
        return this.usersService.addRole(dto);
    }
}
