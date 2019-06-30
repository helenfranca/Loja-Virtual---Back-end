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
    private readonly criptoService: CriptografiaService
  ) {}

  private async validate(userData): Promise<Pessoa | Administrador> {
    console.log(userData);
    let usuario: any = {
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
    usuario = pessoa;
    let admin = await this.adminService.pessoaAdmin(pessoa);
    if (admin != null) {
      usuario.admin = admin.matricula;
      usuario.cnes = admin.hemocentro.cnes;
      return usuario;
    } else {
      return usuario;
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

      return {
        expires_in: 3600,
        access_token: accessToken,
        user_id: u,
        status: 200,
      };
    } else {
      return {
        status: 404,
        message: 'Email ou senha incorreto!',
        access_token: "Sem Token!"
      };
    }
  }

  public async register(user: Pessoa): Promise<any> {
    return this.userService.Create(user);
  }

  async validateOAuthLogin(profile, provider: string): Promise<string | any> {
    try {
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
