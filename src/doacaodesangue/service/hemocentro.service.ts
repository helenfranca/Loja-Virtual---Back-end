// ~~ Parte Service
// Montar os objetos na camada anterior, na camada de lógica
// A partir de agora no serviço só vai constar a comunicação do banco

import { genericInterface } from './interface/generic.interface';
import { Injectable } from '@nestjs/common';
import { Hemocentro } from '../model/hemocentro.entity';
import { CriptografiaService } from './logica/criptografia.logica';

@Injectable()
export class HemocentroService implements genericInterface<Hemocentro> {
  readAll(): Promise<Hemocentro[]> {
    return Hemocentro.find();
  }
  readOne(id: number): Promise<Hemocentro> {
    return Hemocentro.findOne({ id: id });
  }

  async Create(body: any): Promise<Hemocentro> {
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
    return await Hemocentro.findOne({ id: body.idhemocentro });
  }
}
