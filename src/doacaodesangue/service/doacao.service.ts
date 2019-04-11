import { genericInterface } from './interface/generic.interface';
import { Injectable } from '@nestjs/common';
import { Doacao } from '../model/doacao.entity';
import { Pessoa } from '../model/pessoa.entity';

@Injectable()
export class DoacaoService implements genericInterface<Doacao> {
  readAll(): Promise<Doacao[]> {
    return Doacao.find();
  }

  readOne(id: number): Promise<Doacao> {
    return Doacao.findOne({ id: id });
  }

  async Create(body: any): Promise<Doacao> {
    let doacao = new Doacao();
    try {
      doacao.quantidade = body.quantidade;
      doacao.datadoacao = body.data;
      doacao.observacao = body.observacao;
      let pessoa = await Pessoa.findOne({ cpf: body.cpf });
      doacao.pessoa = pessoa;
      return await Doacao.save(doacao);
    } catch (err) {
      throw new Error(
        `Erro ao salvar doação \n Erro: ${err.name}\n Mensagem: ${
          err.message
        }\n Os parametros estao certos?`,
      );
    }
  }

  Drop(body: any): Promise<Doacao> {
    throw new Error('Method not implemented.');
  }

  Update(body: any): Promise<Doacao> {
    throw new Error('Method not implemented.');
  }
}
