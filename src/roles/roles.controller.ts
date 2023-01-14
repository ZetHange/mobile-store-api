import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateRoleDto } from './dto/create-role.dto';
import { RolesService } from './roles.service';

@ApiTags('Роли')
@Controller('roles')
export class RolesController {
    constructor(readonly rolesService: RolesService) { }

    @Get()
    @ApiResponse({ status: 200, type: [CreateRoleDto] })
    getAllRoles() {
        return this.rolesService.getAllRoles()
    }


    @Get(':title')
    @ApiResponse({ status: 200, type: CreateRoleDto })
    getRoleByTitle(@Param('title') title: string) {
        return this.rolesService.getRoleByTitle(title)
    }

    @Post()
    createRole(@Body() dto: CreateRoleDto) {
        return this.rolesService.createRole(dto)
    }
}
