import { Injectable } from '@nestjs/common';
import { genericInterface } from './interface/generic.interface';
import { Observacao } from '../model/observacao.entity';

@Injectable()
export class ObservacaoService implements genericInterface<Observacao> {
  readAll(): Promise<Observacao[]> {
    return Observacao.find();
  }

  readOne(id: number): Promise<Observacao> {
    return Observacao.findOne({ id: id });
  }

  async Create(body: any): Promise<Observacao> {
    let observacao = new Observacao();
    console.log('obs');
    try {
      observacao.descricao = body.observacao;
      observacao.doacao = body.iddoacao;

      return await Observacao.save(observacao);
    } catch (err) {
      throw new Error(
        `Erro ao salvar observação \n Erro: ${err.name}\n Mensagem: ${
          err.message
        }\n Os parametros estao certos?`,
      );
    }
  }

  Drop(body: any): Promise<Observacao> {
    throw new Error('Method not implemented.');
  }
  Update(body: any): Promise<Observacao> {
    throw new Error('Method not implemented.');
  }
}
