import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateTagDto {
  @IsString({ message: 'Не строка' })
  @ApiProperty({
    example: 'game',
    description: 'Название тега (на англ)',
  })
  readonly title: string;

  @IsString({ message: 'Не строка' })
  @ApiProperty({
    example: 'Игра',
    description: 'Описание тега',
  })
  readonly description: string;
}
