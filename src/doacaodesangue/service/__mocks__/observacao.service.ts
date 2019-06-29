import { Injectable } from '@nestjs/common';
import { genericInterface } from '../interface/generic.interface';
import { Observacao } from '../../model/observacao.entity';
import { Doacao } from '../../model/doacao.entity';

@Injectable()
export class ObservacaoService implements genericInterface<Observacao> {
  async readAll(): Promise<Observacao[]> {
    let observacao = new Observacao();
    observacao.id = 0;
    observacao.descricao = "Tudo certo!";
    observacao.doacao = new Doacao();
    return [observacao, observacao];
  }

  async readOne(id: number): Promise<Observacao> {
    let observacao = new Observacao();
    observacao.id = 0;
    observacao.descricao = "Tudo certo!";
    observacao.doacao = new Doacao();
    if (id === observacao.id)
      return observacao;
    else return new Observacao();
  }

  async Create(body: any): Promise<Observacao> {
    let observacao = new Observacao();
    observacao.id = 0;
    observacao.descricao = "Tudo certo!";
    observacao.doacao = new Doacao();
    return observacao;
  }

  async Drop(body: any): Promise<Observacao> {
    let observacao = new Observacao();
    observacao.id = 0;
    observacao.descricao = "Tudo certo!";
    observacao.doacao = new Doacao();
    return observacao;
  }
  async Update(body: any): Promise<Observacao> {
    let observacao = new Observacao();
    observacao.id = 0;
    observacao.descricao = "Tudo certo!";
    observacao.doacao = new Doacao();
    return observacao;
  }

  
}
