import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('Аутентификация')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    @ApiOperation({summary: 'Авторизовация'})
    login(@Body() dto: CreateUserDto) {
        return this.authService.login(dto);
    }
    
    @Post('registration')
    @ApiOperation({summary: 'Регистрация'})
    register(@Body() dto: CreateUserDto) {
        return this.authService.registration(dto);
    }
}
