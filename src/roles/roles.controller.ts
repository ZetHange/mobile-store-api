import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateRoleDto } from './dto/create-role.dto';
import { RolesService } from './roles.service';

@ApiTags('Роли')
@Controller('roles')
export class RolesController {
    constructor(readonly rolesService: RolesService) { }

    @Get()
    @ApiOperation({ summary: 'Получение всех ролей'})
    @ApiResponse({ status: 200, type: [CreateRoleDto] })
    getAllRoles() {
        return this.rolesService.getAllRoles()
    }


    @Get(':title')
    @ApiOperation({ summary: 'Получение роли по названию'})
    @ApiResponse({ status: 200, type: CreateRoleDto })
    getRoleByTitle(@Param('title') title: string) {
        return this.rolesService.getRoleByTitle(title)
    }

    @Post()
    @ApiOperation({ summary: 'Создание роли'})
    createRole(@Body() dto: CreateRoleDto) {
        return this.rolesService.createRole(dto)
    }
}
