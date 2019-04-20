import { genericInterface } from './interface/generic.interface';
import { Injectable } from '@nestjs/common';
import { Doacao } from '../model/doacao.entity';
import { Pessoa } from '../model/pessoa.entity';
import { Doador } from '../model/doador.entity';

@Injectable()
export class DoacaoService implements genericInterface<Doacao> {
  readAll(): Promise<Doacao[]> {
    return Doacao.createQueryBuilder('doacao')
      .select(
        'doacao.id, pessoa.nome, doacao.datadoacao, doacao.quantidade, doacao.observacao',
      )
      .innerJoin('doacao.pessoa', 'pessoa')
      .getRawMany();
  }

  readOne(id: number): Promise<Doacao> {
    return Doacao.createQueryBuilder('doacao')
      .select(
        'doacao.id, pessoa.nome, doacao.datadoacao, doacao.quantidade, doacao.observacao',
      )
      .innerJoin('doacao.pessoa', 'pessoa')
      .where('doacao.id = :name', { name: id })
      .getRawOne();
  }

  async Create(body: any): Promise<Doacao> {
    let doacao = new Doacao();
    try {
      doacao.quantidade = body.quantidade;
      doacao.datadoacao = body.data;
      doacao.observacao = body.observacao;
      let pessoa = await Pessoa.findOne({ cpf: body.cpf });
      doacao.doador = <Doador>pessoa;
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

  async Update(body: any): Promise<Doacao> {
    try {
      let busca = await Doacao.findOne({ id: body.id });
      busca.quantidade = body.quantidade;
      busca.observacao = body.observacao;
      return await Doacao.save(busca);
    } catch (err) {
      throw new Error(
        `Erro ao atualizar doação \n Erro: ${err.name}\n Mensagem: ${
          err.message
        }\n Os parametros estao certos?`,
      );
    }
  }
}
