import { genericInterface } from '../interface/generic.interface';
import { Injectable } from '@nestjs/common';
import { Doacao } from '../../model/doacao.entity';
import { Doador } from '../../model/doador.entity';
import { Hemocentro } from '../../model/hemocentro.entity';
import { Observacao } from '../../model/observacao.entity';

@Injectable()
export class DoacaoService implements genericInterface<Doacao> {
  async readAll(): Promise<Doacao[]> {
    let doacao: Doacao = new Doacao();
    doacao.id = 0;
    doacao.quantidade = 12;
    doacao.datadoacao = new Date().toLocaleDateString();
    doacao.doador = new Doador();
    doacao.doador.id = 0;
    doacao.hemocentro = new Hemocentro();
    doacao.observacao = new Observacao();
    return [doacao, doacao];
  }

  async readOne(id: number): Promise<Doacao> {
    let doacao: Doacao = new Doacao();
    doacao.id = 0;
    doacao.quantidade = 12;
    doacao.datadoacao = new Date().toLocaleDateString();
    doacao.doador = new Doador();
    doacao.doador.id = 0;
    doacao.hemocentro = new Hemocentro();
    doacao.observacao = new Observacao();
    if (id === doacao.id) {
      return doacao;
    } else {
      return new Doacao();
    }
  }

  async Create(body: any): Promise<Doacao> {
    let doacao: Doacao = new Doacao();
    doacao.id = 0;
    doacao.quantidade = 12;
    doacao.datadoacao = new Date().toLocaleDateString();
    doacao.doador = new Doador();
    doacao.doador.id = 0;
    doacao.hemocentro = new Hemocentro();
    doacao.observacao = new Observacao();
    return doacao;
  }

  async Drop(body: any): Promise<Doacao> {
    throw new Error('Não é possível deletar doação!');
  }

  //Altera a quantidade de sangue doada
  async Update(body: any): Promise<Doacao> {
    let doacao: Doacao = await this.Create(body);
    return doacao;
  }

  //Retorna todas as doações realizadas por um doador, informando o id
  getDoacoesDoador(id: number) {
    let doacao: Doacao = new Doacao();
    doacao.id = 0;
    doacao.quantidade = 12;
    doacao.datadoacao = new Date().toLocaleDateString();
    doacao.doador = new Doador();
    doacao.doador.id = 0;
    doacao.hemocentro = new Hemocentro();
    doacao.observacao = new Observacao();
    if (id === doacao.doador.id) {
      return [doacao, doacao, doacao];
    } else {
      return [new Doacao()];
    }
  }
}
