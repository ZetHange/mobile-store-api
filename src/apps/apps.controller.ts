import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles-auth.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AppsService } from './apps.service';
import { AddTagsDto } from './dto/add-tags.dto';
import { CreateAppDto } from './dto/create-app.dto';

@ApiTags('Приложения')
@ApiBearerAuth()
@Controller('apps')
export class AppsController {
  fileService: any;
  constructor(private readonly appsService: AppsService) {}

  @Get()
  @ApiOperation({ summary: 'Получить все приложения' })
  @ApiResponse({ status: 200, type: [CreateAppDto] })
  getAllApps() {
    return this.appsService.getAllApps();
  }

  @Get(':title')
  @ApiOperation({ summary: 'Получить приложения по названию' }) // потом надо под слаг переделать
  @ApiResponse({ status: 200, type: CreateAppDto })
  getAppByTitle(@Param('title') title: string) {
    return this.appsService.getAppByTitle(title);
  }

  @Delete(':title')
  @ApiOperation({ summary: 'Удалить приложения по названию' }) // потом надо под слаг переделать
  @ApiResponse({ status: 200, type: CreateAppDto })
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  deleteAppByTitle(@Param('title') title: string) {
    return this.appsService.deleteAppByTitle(title);
  }

  @Post()
  @ApiOperation({ summary: 'Создать приложение' })
  @ApiResponse({ status: 200 })
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @UseInterceptors(FileInterceptor('image'))
  createApp(@Body() dto: CreateAppDto, @UploadedFile() image: any) {
    return this.appsService.createApp(dto, image);
  }

  @Post('tag')
  @ApiOperation({ summary: 'Добавить тег приложению' })
  @ApiResponse({ status: 200 })
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  addTag(@Body() dto: AddTagsDto) {
    return this.appsService.addTag(dto);
  }
}
