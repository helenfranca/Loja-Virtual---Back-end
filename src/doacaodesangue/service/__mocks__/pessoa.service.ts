import { Injectable } from '@nestjs/common';
import { SexoEnum, Pessoa } from '../../model/pessoa.entity';
import { Doador } from '../../model/doador.entity';
import { Compra } from '../../model/compra.entity';
import { Endereco } from '../../model/endereco.entity';

@Injectable()
export class PessoaService {
    async findByEmail(email: string, senha: string): Promise<Pessoa> {
        let user1: Pessoa = new Pessoa();
        user1.id = 0;
        user1.cpf = '553.508.997-40';
        user1.datanascimento = new Date('October 13, 1996 05:35:32');
        user1.doador = new Doador();
        user1.email = 'tomasluanvicentedrumond_@econe.com.br';
        user1.nome = 'Tomás Luan';
        user1.sobrenome = 'Vicente Drumond';
        user1.telefone = 2725052279;
        user1.status = true;
        user1.sexo = SexoEnum.Masculino;
        user1.senha = 'lSsH4Cq70m';
        user1.compra = [new Compra()];
        user1.enderecos =  [new Endereco()];
        if (email==user1.email && senha==user1.senha) {
          return user1;
        }
        else {
          return new Pessoa();
        }
      }
      async readAll(): Promise<Pessoa[]> {
        let user1: Pessoa = new Pessoa();
        user1.id = 0;
        user1.cpf = '553.508.997-40';
        user1.datanascimento = new Date('October 13, 1996 05:35:32');
        user1.doador = new Doador();
        user1.email = 'tomasluanvicentedrumond_@econe.com.br';
        user1.nome = 'Tomás Luan';
        user1.sobrenome = 'Vicente Drumond';
        user1.telefone = 2725052279;
        user1.status = true;
        user1.sexo = SexoEnum.Masculino;
        user1.senha = 'lSsH4Cq70m';
        user1.compra = [new Compra()];
        user1.enderecos =  [new Endereco()];
        return [user1, user1];
      }
    
      async pessoaCpf(body) {
        let user1: Pessoa = new Pessoa();
        user1.id = 0;
        user1.cpf = '553.508.997-40';
        user1.datanascimento = new Date('October 13, 1996 05:35:32');
        user1.doador = new Doador();
        user1.email = 'tomasluanvicentedrumond_@econe.com.br';
        user1.nome = 'Tomás Luan';
        user1.sobrenome = 'Vicente Drumond';
        user1.telefone = 2725052279;
        user1.status = true;
        user1.sexo = SexoEnum.Masculino;
        user1.senha = 'lSsH4Cq70m';
        user1.compra = [new Compra()];
        user1.enderecos =  [new Endereco()];
        if (body.cpf==user1.cpf) {
          return user1;
        }
        else {
          return new Pessoa();
        }
      }
    
      // Caso precise descriptar a senha
      async readOne(id: number): Promise<Pessoa> {
        let user1: Pessoa = new Pessoa();
        user1.id = 0;
        user1.cpf = '553.508.997-40';
        user1.datanascimento = new Date('October 13, 1996 05:35:32');
        user1.doador = new Doador();
        user1.email = 'tomasluanvicentedrumond_@econe.com.br';
        user1.nome = 'Tomás Luan';
        user1.sobrenome = 'Vicente Drumond';
        user1.telefone = 2725052279;
        user1.status = true;
        user1.sexo = SexoEnum.Masculino;
        user1.senha = 'lSsH4Cq70m';
        user1.compra = [new Compra()];
        user1.enderecos =  [new Endereco()];
        if (id==user1.id) {
          return user1;
        }
        else {
          return new Pessoa();
        }
      }
    
      async Create(pessoa: Pessoa): Promise<Pessoa> {
        try {
          let user1: Pessoa = new Pessoa();
          user1.id = 0;
          user1.cpf = '553.508.997-40';
          user1.datanascimento = new Date('October 13, 1996 05:35:32');
          user1.doador = new Doador();
          user1.email = 'tomasluanvicentedrumond_@econe.com.br';
          user1.nome = 'Tomás Luan';
          user1.sobrenome = 'Vicente Drumond';
          user1.telefone = 2725052279;
          user1.status = true;
          user1.sexo = SexoEnum.Masculino;
          user1.senha = 'lSsH4Cq70m';
          user1.compra = [new Compra()];
          user1.enderecos =  [new Endereco()];
          return user1;
        } catch (err) {
          throw new Error(`Erro ao salvar pessoa \n Erro: ${err.name}\n
          Mensagem: ${err}\n Os parametros estao certos?`);
        }
      }
    
      async Drop(pessoa: Pessoa): Promise<Pessoa> {
        try {
          let user1: Pessoa = new Pessoa();
          user1.id = 0;
          user1.cpf = '553.508.997-40';
          user1.datanascimento = new Date('October 13, 1996 05:35:32');
          user1.doador = new Doador();
          user1.email = 'tomasluanvicentedrumond_@econe.com.br';
          user1.nome = 'Tomás Luan';
          user1.sobrenome = 'Vicente Drumond';
          user1.telefone = 2725052279;
          user1.status = true;
          user1.sexo = SexoEnum.Masculino;
          user1.senha = 'lSsH4Cq70m';
          user1.compra = [new Compra()];
          user1.enderecos =  [new Endereco()];
          return user1;
        } catch (err) {
          throw new Error(`Erro ao salvar pessoa \n Erro: ${err.name}\n
          Mensagem: ${err}\n Os parametros estao certos?`);
        }
      }
    
      async Update(pessoa: Pessoa): Promise<Pessoa> {
        try {let user1: Pessoa = new Pessoa();
          user1.id = 0;
          user1.cpf = '553.508.997-40';
          user1.datanascimento = new Date('October 13, 1996 05:35:32');
          user1.doador = new Doador();
          user1.email = 'tomasluanvicentedrumond_@econe.com.br';
          user1.nome = 'Tomás Luan';
          user1.sobrenome = 'Vicente Drumond';
          user1.telefone = 2725052279;
          user1.status = true;
          user1.sexo = SexoEnum.Masculino;
          user1.senha = 'lSsH4Cq70m';
          user1.compra = [new Compra()];
          user1.enderecos =  [new Endereco()];
          return user1;
        } 
        catch (err) {
          throw new Error(`Erro ao salvar pessoa \n Erro: ${err.name}\n
          Mensagem: ${err}\n Os parametros estao certos?`);
        }
      }
}