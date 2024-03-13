import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthResponseDTO } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor (private readonly authSevice : AuthService) {}

    @Post('/login')
    async signIn (
        @Body('cpf') cpf : string,
        @Body('password') password : string,
    ) {
        return this.authSevice.signIn(cpf, password);
    }
}
