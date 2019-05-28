// ~~ Parte Service
// Montar os objetos na camada anterior, na camada de lógica
// A partir de agora no serviço só vai constar a comunicação do banco

import { genericInterface } from './interface/generic.interface';
import { Injectable } from '@nestjs/common';
import { Pessoa } from '../model/pessoa.entity';
import { CriptografiaService } from './logica/criptografia.logica';

@Injectable()
export class PessoaService implements genericInterface<Pessoa> {
  readAll(): Promise<Pessoa[]> {
    return Pessoa.find();
  }

  // Caso precise descriptar a senha
  async readOne(id: number): Promise<Pessoa> {
    let a: Pessoa = await Pessoa.findOne({ id: id });
    return a;
  }

  async Create(pessoa: Pessoa): Promise<Pessoa> {
    try {
      return await Pessoa.save(pessoa);
    } catch (err) {
      throw new Error(
        `Erro ao salvar pessoa \n Erro: ${err.name}\n Mensagem: ${
          err.message
        }\n Os parametros estao certos?`,
      );
    }
  }

  async Drop(body: any): Promise<Pessoa> {
    try {
      let pessoa = await Pessoa.findOne({ cpf: body.cpf });
      pessoa.status = false;
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
