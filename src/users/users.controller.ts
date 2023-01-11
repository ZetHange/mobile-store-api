import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
@ApiBearerAuth()
@ApiTags('Пользователи')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    getAllUsers() {
        return this.usersService.getAllUsers();
    }
    
    @Get(':id')
    getUserById(@Param('id') id: number) {
        return this.usersService.getUserById(id);
    }

    @Post()
    createUser(@Body() dto: CreateUserDto) {
        return this.usersService.createUser(dto);
    }
}
