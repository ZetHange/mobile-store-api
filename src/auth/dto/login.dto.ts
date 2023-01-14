import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class LoginDto {
    @IsString()
    @ApiProperty({
        example: 'user228',
        description: 'Никнейм пользователя',
    })
    readonly nickname: string;
    
    @IsString()
    @ApiProperty({
        example: 'pass1234',
        description: 'Пароль пользователя',
    })
    readonly password: string;
}