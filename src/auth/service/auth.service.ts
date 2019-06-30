import { JwtService } from '@nestjs/jwt';
import { PessoaService } from 'src/doacaodesangue/service/pessoa.service';
import { Pessoa } from 'src/doacaodesangue/model/pessoa.entity';
import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { CriptografiaService } from 'src/doacaodesangue/service/logica/criptografia.logica';
import { AdministradorService } from 'src/doacaodesangue/service/administrador.service';
import { Administrador } from 'src/doacaodesangue/model/administrador.entity';

enum Provider {
  GOOGLE = 'google',
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: PessoaService,
    private readonly adminService: AdministradorService,
    private readonly jwtService: JwtService,
  ) {}

  private async validate(userData): Promise<Pessoa | Administrador> {
    console.log(userData);
    let b: any = {
      nome: null,
      sobrenome: null,
      email: null,
      datanascimento: null,
      cpf: null,
      sexo: null,
      admin: null,
      cnes: null,
    };
    let pessoa = await this.userService.findByEmail(
      userData.email,
      userData.senha,
    );
    b = pessoa;
    let x = await this.adminService.pessoaAdmin(pessoa);
    if (x != null) {
      b.admin = x.matricula;
      b.cnes = x.hemocentro.cnes;
      return b;
    } else {
      return b;
    }
  }

  public async login(user): Promise<any | { status: number }> {
    let usuario = {
      email: null,
      senha: null,
    };
    let a = new CriptografiaService();
    usuario.email = user.login;
    usuario.senha = a.criptografar(user.senha);
    let u: any = await this.validate(usuario);

    if (u != null) {
      let payload = `${u.nome}${u.id}`;
      const accessToken = this.jwtService.sign(payload);

      let a = {
        expires_in: 3600,
        access_token: accessToken,
        user_id: u,
        status: 200,
      };
      console.log(a);
      return a;
    } else {
      return {
        status: 404,
        message: 'Email ou senha incorreto!',
      };
    }
  }

  public async register(user: Pessoa): Promise<any> {
    return this.userService.Create(user);
  }

  async validateOAuthLogin(profile, provider: string): Promise<string | any> {
    try {
      /*
            // Registrando o usuário
            let user: Pessoa = await this.userService.findByEmail(profile.emails[0].value, profile.id);
            if (!user) {
                this.userService.RegisterOAuthUser(profile);
            }
            */
      var id: string = profile.id;
      const payload = { id, provider };

      const jwt: string = sign(payload, process.env.PRIVATE_KEY, {
        expiresIn: 3600,
      });
      return jwt;
    } catch (err) {
      return {
        status: 404,
        message: 'Email ou senha incorreto!',
      };
    }
  }
}
