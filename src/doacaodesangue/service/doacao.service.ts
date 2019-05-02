import { genericInterface } from './interface/generic.interface';
import { Injectable } from '@nestjs/common';
import { Doacao } from '../model/doacao.entity';
import { Pessoa } from '../model/pessoa.entity';
import { Doador } from '../model/doador.entity';
import { Hemocentro } from '../model/hemocentro.entity';
import { ObservacaoService } from './observacao.service';
import { Observacao } from '../model/observacao.entity';

@Injectable()
export class DoacaoService implements genericInterface<Doacao> {
  readAll(): Promise<Doacao[]> {
    return Doacao.createQueryBuilder('doacao')
      .select('doacao.id, pessoa.nome, doacao.datadoacao, doacao.quantidade')
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
      let pessoa = await Pessoa.findOne({ cpf: body.cpf });
      let doador = await Doador.findOne({ pessoa: pessoa });
      let hemocentro = await Hemocentro.findOne({ id: body.idhemocentro });

      doacao.quantidade = body.quantidade;
      doacao.datadoacao = body.data;
      doacao.doador = doador;
      doacao.hemocentro = hemocentro;
      let doa = await Doacao.save(doacao);

      if (body.observacao != undefined) {
        let obs = {};
        obs['observacao'] = body.observacao;
        obs['iddoacao'] = doa;

        let observacaoService = new ObservacaoService();
        await observacaoService.Create(obs);
      }
      return doacao;
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

  async Update(body: any): Promise<Doacao> {
    try {
      let busca = await Doacao.findOne({ id: body.id });
      busca.quantidade = body.quantidade;
      return await Doacao.save(busca);
    } catch (err) {
      throw new Error(
        `Erro ao atualizar doação \n Erro: ${err.name}\n Mensagem: ${
          err.message
        }\n Os parametros estao certos?`,
      );
    }
  }

  getDoacoes(id: number) {
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
