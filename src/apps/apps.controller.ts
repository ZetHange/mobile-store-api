import { Controller, Get, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppsService } from './apps.service';

@ApiTags('Приложения')
@Controller('apps')
export class AppsController {
    constructor(private readonly appsService: AppsService) {}

    @Get()
    getAllApps() {
        return this.appsService.getAllApps()
    }
}
