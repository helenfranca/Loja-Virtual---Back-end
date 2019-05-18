import { Controller, Post, Body } from  '@nestjs/common';
import { AuthService } from  'src/auth/service/auth.service';
import { Pessoa } from 'src/doacaodesangue/model/pessoa.entity';


@Controller('auth')
export  class  AuthController {
    constructor(private  readonly  authService:  AuthService) {}
    @Post('/login')
    async login(@Body() user: Pessoa): Promise<any> {
      return this.authService.login(user);
    }  

    @Post('/register')
    async register(@Body() user: Pessoa): Promise<any> {
      return this.authService.register(user);
    }  
}