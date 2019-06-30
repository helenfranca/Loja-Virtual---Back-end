import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from 'src/auth/service/auth.service';
import { Pessoa } from 'src/doacaodesangue/model/pessoa.entity';
import { ApiUseTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { verify } from 'jsonwebtoken';

@ApiUseTags('Autenticação')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/login')
  async login(@Body() user: Pessoa): Promise<any> {
    console.log(user);
    return this.authService.login(user);
  }

  @Post('/register')
  async register(@Body() user: Pessoa): Promise<any> {
    return this.authService.register(user);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleLogin() {
    // inicia fluxo de login usando Google OAuth2
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleLoginCallback(@Req() req, @Res() res) {
    const jwt: string = req.user.jwt;
    if (jwt) res.redirect('http://localhost:3000/login/succes/' + jwt);
    else res.redirect('http://localhost:3000/login/failure');
  }

   static verifyJWT(req, res){
    var token = req.headers['x-access-token'];
    if (!token) {
      console.log('Token não encontrado!')
      return res.status(401).send({status: 404, message: 'Token não encontrado!' });
    }
    verify(token, process.env.PRIVATE_KEY, function(err, decoded) {
      if (err) {
        console.log('Falha ao autenticar token!');
        return res.status(500).send({status: 404, message: 'Falha ao autenticar token!' });
      }
      console.log('Token válido!');
    });
  }
}
