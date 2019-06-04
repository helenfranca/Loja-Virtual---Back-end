import { genericInterface } from './interface/generic.interface';
import { Injectable } from '@nestjs/common';
import { Pessoa } from '../model/pessoa.entity';

@Injectable()
export class PessoaService implements genericInterface<Pessoa> {
    
  async findByEmail(email: string, senha: string): Promise<Pessoa> {
    let user: Pessoa = await Pessoa.createQueryBuilder('pessoa')
       .where('pessoa.email = :e and pessoa.senha = :s', { e: email, s: senha})
       .getOne();
    return user;
  }
  readAll(): Promise<Pessoa[]> {
    return Pessoa.find();
  }

  async pessoaCpf(body) {
    return await Pessoa.findOne({ cpf: body.cpf });
  }

  // Caso precise descriptar a senha
  async readOne(id: number): Promise<Pessoa> {
    return await Pessoa.findOne({ id: id });
  }

  async Create(pessoa: Pessoa): Promise<Pessoa> {
    try {
      return await Pessoa.save(pessoa);
    } catch (err) {
      throw new Error(
        `Erro ao salvar pessoa \n Erro: ${
          err.name
        }\n Mensagem: ${err}\n Os parametros estao certos?`,
      );
    }
  }

  async Drop(pessoa: Pessoa): Promise<Pessoa> {
    try {
      return await Pessoa.save(pessoa);
    } catch (err) {
      throw new Error(
        `Erro ao apagar pessoa \n Erro: ${err.name}\n Mensagem: ${
          err.message
        }\n Os parametros estao certos?`,
      );
    }
  }

  async Update(pessoa: Pessoa): Promise<Pessoa> {
    try {
      return await Pessoa.save(pessoa);
    } catch (err) {
      throw new Error(
        `Erro ao atualizar pessoa \n Erro: ${err.name}\n Mensagem: ${
          err.message
        }\n Os parametros estao certos?`,
      );
    }
  }
}
