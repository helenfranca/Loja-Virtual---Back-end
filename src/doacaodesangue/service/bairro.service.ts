import { genericInterface } from './interface/generic.interface';
import { Injectable } from '@nestjs/common';
import { Bairro } from '../model/bairro.entity';

@Injectable()
export class BairroService implements genericInterface<Bairro> {
  async readAll(): Promise<Bairro[]> {
    return await Bairro.find();
  }

  async readOne(nome: string): Promise<Bairro> {
    return await Bairro.findOne({ nome: nome });
  }

  async Create(body: any): Promise<Bairro> {
    try {
      return await Bairro.save(body);
    } catch (err) {
      throw new Error(
        `Erro ao salvar Bairro \n Erro: ${err.name}\n Mensagem: ${
          err.message
        }\n Os parametros estao certos?`,
      );
    }
  }

  async Drop(body: Bairro): Promise<Bairro> {
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
  async Update(body: any): Promise<Bairro> {
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
