import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateRoleDto {
    @IsString({ message: 'Не строка' })
    @ApiProperty({
      example: 'ADMIN',
      description: 'Название роли',
    })
    readonly title: string;
  
    @IsString({ message: 'Не строка' })
    @ApiProperty({
      example: 'Администратор сайта',
      description: 'Описание роли',
    })
    readonly description: string;
}