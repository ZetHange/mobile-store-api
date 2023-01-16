import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTagDto } from './dto/create-tag.dto';
import { TagsService } from './tags.service';

@ApiTags('Теги')
@Controller('tags')
export class TagsController {
    constructor(private readonly tagsService: TagsService) {}

    @Get()
    @ApiOperation({ summary: 'Получение всех тегов'})
    @ApiResponse({ status: 200, type: [CreateTagDto] })
    getAllTags() {
        return this.tagsService.getAllTags()
    }

    @Post()
    @ApiOperation({ summary: 'Создание нового тега'})
    @ApiResponse({ status: 200 })
    createTag(@Body() dto: CreateTagDto) {
        return this.tagsService.createTag(dto)
    }
}
