<<<<<<< HEAD
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles-auth.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
=======
import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiOperation,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
>>>>>>> 6847f4fe3e4e3e8091955aee737f88815d8ad637
import { CreateTagDto } from './dto/create-tag.dto';
import { TagsService } from './tags.service';

@ApiBearerAuth()
@ApiTags('Теги')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

<<<<<<< HEAD
    @Get()
    @ApiOperation({ summary: 'Получение всех тегов'})
    @ApiResponse({ status: 200, type: [CreateTagDto] })
    @UseGuards(RolesGuard)
    @Roles('ADMIN')
    getAllTags() {
        return this.tagsService.getAllTags()
    }

    @Post()
    @ApiOperation({ summary: 'Создание нового тега'})    
    @ApiResponse({ status: 200 })
    @UseGuards(RolesGuard)
    @Roles('ADMIN')
    createTag(@Body() dto: CreateTagDto) {
        return this.tagsService.createTag(dto)
    }
=======
  @Get()
  @ApiOperation({ summary: 'Получение всех тегов' })
  @ApiResponse({ status: 200, type: [CreateTagDto] })
  getAllTags() {
    return this.tagsService.getAllTags();
  }

  @Post()
  @ApiOperation({ summary: 'Создание нового тега' })
  @ApiResponse({ status: 200 })
  createTag(@Body() dto: CreateTagDto) {
    return this.tagsService.createTag(dto);
  }
>>>>>>> 6847f4fe3e4e3e8091955aee737f88815d8ad637
}
