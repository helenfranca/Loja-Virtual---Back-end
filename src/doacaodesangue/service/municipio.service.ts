import { genericInterface } from './interface/generic.interface';
import { Injectable } from '@nestjs/common';
import { Estado } from '../model/estado.entity';
import { Municipio } from '../model/municipio.entity';

@Injectable()
export class MunicipioService implements genericInterface<Municipio> {
  async readAll(): Promise<Municipio[]> {
    return await Municipio.find();
  }
  async readOne(nome: string): Promise<Municipio> {
    return await Municipio.findOne({ nome: nome });
  }

  async Create(body: any): Promise<Municipio> {
    try {
      return await Municipio.save(body);
    } catch (err) {
      throw new Error(
        `Erro ao salvar Municipio \n Erro: ${err.name}\n Mensagem: ${
          err.message
        }\n Os parametros estao certos?`,
      );
    }
  }
/***
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
    return await Hemocentro.findOne({ id: body.idhemocentro });
  }***/
}
