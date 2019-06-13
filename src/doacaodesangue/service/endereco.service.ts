import { genericInterface } from './interface/generic.interface';
import { Injectable } from '@nestjs/common';
import { Endereco } from '../model/endereco.entity';

@Injectable()
export class EnderecoService implements genericInterface<Endereco> {
  async readAll(): Promise<Endereco[]> {
    return await Endereco.find();
  }

  async readOne(cep: string): Promise<Endereco> {
    return await Endereco.findOne({ cep: cep });
  }

  async buscaCepNum(cep: string, num: number): Promise<Endereco> {
    return await Endereco.findOne({ cep: cep, numero: num });
  }

  async Create(body: any): Promise<Endereco> {
    try {
      return await Endereco.save(body);
    } catch (err) {
      throw new Error(
        `Erro ao salvar Endereco \n Erro: ${err.name}\n Mensagem: ${
          err.message
        }\n Os parametros estao certos?`,
      );
    }
  }

  async Drop(body: Endereco): Promise<Endereco> {
    throw new Error('Method not implemented.');
  }
  /***try {
      return await Hemocentro.save(body);
    } catch (err) {
      throw new Error(
        `Erro ao deletar Hemocentro \n Erro: ${err.name}\n Mensagem: ${
          err.message
        }\n Os parametros estao certos?`,
      );
    }
  }
***/
  async Update(body: any): Promise<Endereco> {
    throw new Error('Method not implemented.');
  }
  /***try {
      return await Hemocentro.save(body);
    } catch (err) {
      throw new Error(
        `Erro ao atualizar Hemocentro \n Erro: ${err.name}\n Mensagem: ${
          err.message
        }\n Os parametros estao certos?`,
      );
    }
  }

  async hemocentroDemanda() {
    let hemocentro: Hemocentro[] = await Hemocentro.createQueryBuilder(
      'hemocentro',
    )
      .select(
        'count(hemocentro.id) as qtddemanda, hemocentro.nome as hemocentro, tiposanguineo.tipofator',
      )
      .innerJoin('hemocentro.demanda', 'demanda')
      .innerJoin('demanda.tiposanguineo', 'tiposanguineo')
      .groupBy('hemocentro.nome, tiposanguineo.tipofator')
      .orderBy('hemocentro.nome, tipofator')
      .getRawMany();

    return hemocentro;
  }

  async hemocentro(body) {
    return await Hemocentro.findOne({ id: body.idhemocentro });
  }***/
}
