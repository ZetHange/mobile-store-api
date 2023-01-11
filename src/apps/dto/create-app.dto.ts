import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateAppDto {
  @IsString({ message: 'Не строка' })
  @ApiProperty({
    example: 'S.T.A.L.K.E.R.: SHoC',
    description: 'Название приложения',
  })
  readonly title: string;

  @IsString({ message: 'Не строка' })
  @ApiProperty({
    example: 'Самый имбовый шутер человечесва',
    description: 'Описание приложения',
  })
  readonly description: string;

  @IsString({ message: 'Не строка' })
  @ApiProperty({ example: '/static/apps/slug/image.webp', description: 'Иконка' })
  readonly image: string;

  @IsString({ message: 'Не строка' })
  @ApiProperty({ example: 'GSC Game World', description: 'Разработчик' })
  readonly developer: string;
}
