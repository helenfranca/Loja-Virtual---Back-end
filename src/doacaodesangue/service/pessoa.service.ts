import { Pessoa } from 'src/doacaodesangue/model/pessoa.entity';
import { genericInterface } from './interface/generic.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PessoaService implements genericInterface<Pessoa> {
  readAll(): Promise<Pessoa[]> {

    return Pessoa.find();
  }
  readOne(id: number): Promise<Pessoa> {
    return Pessoa.findOne({ id: id });
  }

  async Create(body: any): Promise<Pessoa> {
    let pessoa = new Pessoa();
    try {
      pessoa.nome = body.nome;
      pessoa.sobrenome = body.sobrenome;
      pessoa.datanascimento = body.datanascimento;
      pessoa.cpf = body.cpf;
      pessoa.sexo = body.sexo;
      pessoa.email = body.email;
      pessoa.telefone = body.telefone;
      pessoa.senha = body.senha;
      return await Pessoa.save(pessoa);
    } catch (err) {
      throw new Error(
        `Erro ao salvar pessoa \n Erro: ${err.name}\n Mensagem: ${
          err.message
        }\n Os parametros estao certos?`,
      );
    }
  }

  Drop(body: any): Promise<Pessoa> {
    throw new Error('Method not implemented.');
  }

  async Update(body: any): Promise<Pessoa> {
    try {
      let busca = await Pessoa.findOne({ cpf: body.cpf });
      busca.telefone = body.telefone;
      busca.email = body.email;
      busca.senha = body.senha;
      return await Pessoa.save(busca);
    } catch (err) {
      throw new Error(
        `Erro ao atualizar pessoa \n Erro: ${err.name}\n Mensagem: ${
          err.message
        }\n Os parametros estao certos?`,
      );
    }
 
  }
}
