import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppsService } from './apps.service';
import { CreateAppDto } from './dto/create-app.dto';

@ApiTags('Приложения')
@Controller('apps')
export class AppsController {
  constructor(private readonly appsService: AppsService) {}

  @Get()
  @ApiOperation({summary: 'Получить все приложения'})
  @ApiResponse({ status: 200, type: [CreateAppDto] })
  getAllApps() {
    return this.appsService.getAllApps();
  }

  @Get(':title')
  @ApiOperation({summary: 'Получить приложения по названию'})
  @ApiResponse({ status: 200, type: CreateAppDto })
  getAppByTitle(@Param('title') title: string) {
    return this.appsService.getAppByTitle(title);
  }

  @Post()
  @ApiOperation({summary: 'Создать приложение'})
  @ApiResponse({ status: 200 })
  createApp(@Body() dto: CreateAppDto) {
    return this.appsService.createApp(dto);
  }
}
