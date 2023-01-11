import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppsService } from './apps.service';
import { CreateAppDto } from './dto/create-app.dto';

@ApiTags('Приложения')
@Controller('apps')
export class AppsController {
  constructor(private readonly appsService: AppsService) {}

  @Get()
  @ApiResponse({ status: 200, type: [CreateAppDto] })
  getAllApps() {
    return this.appsService.getAllApps();
  }

  @Get(':title')
  @ApiResponse({ status: 200, type: CreateAppDto })
  getAppByTitle(@Param('title') title: string) {
    return this.appsService.getAppByTitle(title);
  }

  @Post()
  createApp(@Body() dto: CreateAppDto) {
    return this.appsService.createApp(dto);
  }
}
