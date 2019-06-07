import { genericInterface } from './interface/generic.interface';
import { Injectable } from '@nestjs/common';
import { Estado } from '../model/estado.entity';

@Injectable()
export class EstadoService implements genericInterface<Estado> {
  async readAll(): Promise<Estado[]> {
    return await Estado.find();
  }
  async readOne(nome: string): Promise<Estado> {
    return await Estado.findOne({ nome: nome });
  }

  async Create(body: any): Promise<Estado> {
    try {
      return await Estado.save(body);
    } catch (err) {
      throw new Error(
        `Erro ao salvar Estado \n Erro: ${err.name}\n Mensagem: ${
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
