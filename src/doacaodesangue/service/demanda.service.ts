// ~~ Parte Service
// Montar os objetos na camada anterior, na camada de lógica
// A partir de agora no serviço só vai constar a comunicação do banco

import { Injectable } from '@nestjs/common';
import { Demanda, StatusEnum } from '../model/demanda.entity';
import { genericInterface } from './interface/generic.interface';
import { Hemocentro } from '../model/hemocentro.entity';
import { TipoSanguineoService } from './tiposanguineo.service';

@Injectable()
export class DemandaService implements genericInterface<Demanda> {
  readAll(): Promise<Demanda[]> {
    return Demanda.createQueryBuilder('demanda')
      .select(
        'demanda.id, demanda.status, hemocentro.nome, tiposanguineo.tipofator',
      )
      .innerJoin('demanda.hemocentro', 'hemocentro')
      .innerJoin('demanda.tiposanguineo', 'tiposanguineo')
      .getRawMany();
  }

  readOne(id: number): Promise<Demanda> {
    return Demanda.createQueryBuilder('demanda')
      .select(
        'demanda.id, demanda.status, hemocentro.nome, tiposanguineo.tipofator',
      )
      .innerJoin('demanda.hemocentro', 'hemocentro')
      .innerJoin('demanda.tiposanguineo', 'tiposanguineo')
      .where('demanda.id = :name', { name: id })
      .getRawOne();
  }

  async demandaTipo() {
    let demanda = await Demanda.createQueryBuilder('demanda')
      .select('count(demanda.id), tiposanguineo.tipofator')
      .innerJoin('demanda.tiposanguineo', 'tiposanguineo')
      .groupBy('tiposanguineo.tipofator')
      .getRawMany();
    return demanda;
  }

  async Create(body: Demanda): Promise<Demanda> {
    try {
      return await Demanda.save(body);
    } catch (err) {
      throw new Error(
        `Erro ao salvar demanda \n Erro: ${err.name}\n Mensagem: ${
          err.message
        }\n Os parametros estao certos?`,
      );
    }
  }
  async Drop(body: any): Promise<Demanda> {
    try {
      return await Demanda.save(body);
    } catch (err) {
      throw new Error(
        `Erro ao apagar pessoa \n Erro: ${err.name}\n Mensagem: ${
          err.message
        }\n Os parametros estao certos?`,
      );
    }
  }
  Update(body: any): Promise<Demanda> {
    throw new Error('Method not implemented.');
  }
}
