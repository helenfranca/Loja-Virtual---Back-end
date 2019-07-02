import { genericInterface } from './interface/generic.interface';
import { Injectable } from '@nestjs/common';
import { Doacao } from '../model/doacao.entity';

@Injectable()
export class DoacaoService implements genericInterface<Doacao> {
  readAll(): Promise<Doacao[]> {
    return Doacao.createQueryBuilder('doacao')
      .select(
        'doacao.id, pessoa.nome, pessoa.sobrenome, doacao.datadoacao, doacao.quantidade, observacao.descricao',
      )
      .innerJoin('doacao.doador', 'doador')
      .innerJoin('doador.pessoa', 'pessoa')
      .leftJoin('doacao.observacao', 'observacao')
      .getRawMany();
  }

  readOne(id: number): Promise<Doacao> {
    return Doacao.createQueryBuilder('doacao')
      .select(
        'doacao.id, pessoa.nome, pessoa.sobrenome, doacao.datadoacao, doacao.quantidade, observacao.descricao',
      )
      .innerJoin('doacao.doador', 'doador')
      .innerJoin('doador.pessoa', 'pessoa')
      .leftJoin('doacao.observacao', 'observacao')
      .where('doacao.id = :name', { name: id })
      .getRawOne();
  }

  async buscaDoacoesPorCpf(cpf:string): Promise<Doacao[]>{
    return await Doacao.createQueryBuilder('doacao')
    .select('doacao.*')
    .innerJoin('doacao.doador','doador')
    .innerJoin('doador.pessoa','pessoa')
    .where('pessoa.cpf = :c',{c: cpf})
    .getRawMany();
  }

  async Create(body: any): Promise<Doacao> {
    try {
      return await Doacao.save(body);
    } catch (err) {
      throw new Error(
        `Erro ao salvar doação \n Erro: ${err.name}\n Mensagem: ${
          err.message
        }\n Os parametros estao certos?`,
      );
    }
  }

  Drop(body: any): Promise<Doacao> {
    throw new Error('Não é possível deletar doação!');
  }

  //Altera a quantidade de sangue doada
  async Update(body: any): Promise<Doacao> {
    try {
      return await Doacao.save(body);
    } catch (err) {
      throw new Error(
        `Erro ao atualizar doação \n Erro: ${err.name}\n Mensagem: ${
          err.message
        }\n Os parametros estao certos?`,
      );
    }
  }

  //Retorna todas as doações realizadas por um doador, informando o id
  getDoacoesDoador(id: number) {
    return Doacao.createQueryBuilder('doacao')
      .select(
        ' doacao.quantidade, doacao.datadoacao, hemocentro.nome, observacao.descricao',
      )
      .leftJoin('doacao.observacao', 'observacao')
      .innerJoin('doacao.hemocentro', 'hemocentro')
      .where('doacao.iddoador = :name', { name: id })
      .getRawMany();
  }
}
