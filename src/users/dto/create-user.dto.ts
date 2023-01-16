import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Не строка' })
  @ApiProperty({
    example: 'user78539414',
    description: 'Никнейм пользователя',
  })
  readonly nickname: string;

  @IsEmail()
  @ApiProperty({
    example: 'user@example.com',
    description: 'Электронная почта',
  })
  readonly email: string;

  @IsString({ message: 'Не строка' })
  @ApiProperty({
    example: 'pass1234',
    description: 'Пароль',
  })
  readonly password: string;
}

export class UpdateUserDto {
  @IsString({ message: 'Не строка' })
  @ApiProperty({
    example: 'user78539414',
    description: 'Никнейм пользователя',
  })
  readonly nickname: string;

  @IsEmail()
  @ApiProperty({
    example: 'user@example.com',
    description: 'Электронная почта',
  })
  readonly email: string;
}
