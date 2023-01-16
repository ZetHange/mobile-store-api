import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class AddTagsDto {
  @IsNumber()
  @ApiProperty({
    example: '1',
    description: 'ID приложения',
  })
  readonly appId: number;

  @IsNumber()
  @ApiProperty({
    example: '1',
    description: 'ID тега',
  })
  readonly tagId: number;
}
