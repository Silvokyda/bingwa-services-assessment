import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../services/auth.service'; 
import { ResponseDto } from '../../../common/dto/response.dto'; 
import { LoginDto } from '../dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    async login(@Body() loginDto: LoginDto): Promise<ResponseDto<{ accessToken: string }>> {
        const user = await this.authService.validateUser(loginDto.email, loginDto.password);
        if (!user) {
            return new ResponseDto('Invalid credentials', null);
        }
        return await this.authService.login(user);
    }
}
