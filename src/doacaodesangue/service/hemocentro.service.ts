import { genericInterface } from './interface/generic.interface';
import { Injectable } from '@nestjs/common';
import { Hemocentro } from '../model/hemocentro.entity';

@Injectable()
export class HemocentroService implements genericInterface<Hemocentro> {
  async readAll(): Promise<Hemocentro[]> {
    return await Hemocentro.find();
  }
  async readOne(id: number): Promise<Hemocentro> {
    return await Hemocentro.findOne({ id: id });
  }

  async readHemocentro(cnes: string): Promise<Hemocentro> {
    return await Hemocentro.findOne({ cnes: cnes });
  }

  async Create(body: Hemocentro): Promise<Hemocentro> {
    try {
      return await Hemocentro.save(body);
    } catch (err) {
      throw new Error(
        `Erro ao salvar Hemocentro \n Erro: ${err.name}\n Mensagem: ${
          err.message
        }\n Os parametros estao certos?`,
      );
    }
  }

  async Drop(body: Hemocentro): Promise<Hemocentro> {
    try {
      return await Hemocentro.save(body);
    } catch (err) {
      throw new Error(
        `Erro ao deletar Hemocentro \n Erro: ${err.name}\n Mensagem: ${
          err.message
        }\n Os parametros estao certos?`,
      );
    }
  }

  async Update(body: any): Promise<Hemocentro> {
    try {
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
    return await Hemocentro.findOne({ cnes: body.cnes });
  }
}
