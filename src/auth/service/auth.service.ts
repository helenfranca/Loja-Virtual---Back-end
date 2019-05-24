import { JwtService } from  '@nestjs/jwt';
import { PessoaService } from 'src/doacaodesangue/service/pessoa.service';
import {Pessoa} from 'src/doacaodesangue/model/pessoa.entity';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { sign } from 'jsonwebtoken';



enum Provider
{
    GOOGLE = 'google'
}

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: PessoaService,
        private readonly jwtService: JwtService
    ) { }
    
    private async validate(userData: Pessoa): Promise<Pessoa> {
        return await this.userService.findByEmail(userData.email, userData.senha);
    }

    public async login(user: Pessoa): Promise< any | { status: number }>{
        let u : Pessoa = await this.validate(user);
        if (u != null) {
            let payload = `${u.nome}${u.id}`;
            const accessToken = this.jwtService.sign(payload);

            return {
                expires_in: 3600,
                access_token: accessToken,
                user_id: payload,
                status: 200
            };
        }
        else {
            return { 
                status: 404,
                message: 'Email ou senha incorreto!'};
        }
    }

    public async register(user: Pessoa): Promise<any>{
        return this.userService.Create(user)
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
            const payload = {id, provider}
            
            const jwt: string = sign(payload, process.env.PRIVATE_KEY, { expiresIn: 3600 });
            return jwt;
        }
        catch (err) {
            return { 
                status: 404,
                message: 'Email ou senha incorreto!'};
        }
    }

}