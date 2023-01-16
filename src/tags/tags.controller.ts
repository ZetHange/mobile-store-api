import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
    ApiBearerAuth,
  ApiOperation,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles-auth.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CreateTagDto } from './dto/create-tag.dto';
import { TagsService } from './tags.service';

@ApiBearerAuth()
@ApiTags('Теги')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  @ApiOperation({ summary: 'Получение всех тегов' })
  @ApiResponse({ status: 200, type: [CreateTagDto] })
  getAllTags() {
    return this.tagsService.getAllTags();
  }

  @Post()
  @ApiOperation({ summary: 'Создание нового тега' })
  @ApiResponse({ status: 200 })
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  createTag(@Body() dto: CreateTagDto) {
    return this.tagsService.createTag(dto);
  }
}
