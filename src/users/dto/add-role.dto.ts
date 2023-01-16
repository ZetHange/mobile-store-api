import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class AddRoleDto {
  @IsNumber()
  @ApiProperty({
    example: '1',
    description: 'ID пользователя',
  })
  readonly userId: number;

  @IsString()
  @ApiProperty({
    example: 'ADMIN',
    description: 'Выдаваемая роль',
  })
  readonly roleTitle: string;
}
