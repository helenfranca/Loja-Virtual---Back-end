// ~~ Parte Service
// Montar os objetos na camada anterior, na camada de lógica
// A partir de agora no serviço só vai constar a comunicação do banco

import { Injectable } from '@nestjs/common';
import { Demanda, StatusEnum } from '../../model/demanda.entity';
import { genericInterface } from '../interface/generic.interface';
import { Hemocentro } from '../../model/hemocentro.entity';
import { TipoSanguineo } from '../../model/tiposanguineo.entity';
import { TipoSanguineoEnum } from '../../model/Enum';


@Injectable()
export class DemandaService implements genericInterface<Demanda> {
  async readAll(): Promise<Demanda[]> {
    let demanda: Demanda = new Demanda();
    demanda.id = 0;
    demanda.hemocentro = new Hemocentro();
    demanda.status = StatusEnum.Aberta;
    demanda.tiposanguineo = new TipoSanguineo();
    return [demanda,demanda];
  }

  async readOne(id: number): Promise<Demanda> {
    let demanda: Demanda = new Demanda();
    demanda.id = 0;
    demanda.hemocentro = new Hemocentro();
    demanda.status = StatusEnum.Aberta;
    demanda.tiposanguineo = new TipoSanguineo();
    if (id == demanda.id) {
        return demanda;
    }
    else {
        return new Demanda();
    }
  }

  async demandaTipo() {
    let result = [{tipofator:TipoSanguineoEnum.Oneg, count: 21233}, 
      {tipofator:TipoSanguineoEnum.Apos, count: 9083}];
    return result;
  }

  async Create(body: Demanda): Promise<Demanda> {
    try {
        let demanda: Demanda = new Demanda();
        demanda.id = 0;
        demanda.hemocentro = new Hemocentro();
        demanda.status = StatusEnum.Aberta;
        demanda.tiposanguineo = new TipoSanguineo();
        return demanda;
    } catch (err) {
      throw new Error(`Erro ao salvar demanda \n Erro: ${err.name}\n
        Mensagem: ${err.message}\n Os parametros estao certos?`);
    }
  }
  async Drop(body: any): Promise<Demanda> {
    try {
        let demanda: Demanda = new Demanda();
        demanda.id = 0;
        demanda.hemocentro = new Hemocentro();
        demanda.status = StatusEnum.Aberta;
        demanda.tiposanguineo = new TipoSanguineo();
        return demanda;
    } catch (err) {
        throw new Error(`Erro ao excluir demanda \n Erro: ${err.name}\n
        Mensagem: ${err.message}\n Os parametros estao certos?`);
    }
  }
  async Update(body: any): Promise<Demanda> {
    try {
        let demanda: Demanda = new Demanda();
        demanda.id = 0;
        demanda.hemocentro = new Hemocentro();
        demanda.status = StatusEnum.Aberta;
        demanda.tiposanguineo = new TipoSanguineo();
        return demanda;
    } catch (err) {
        throw new Error(`Erro ao atualizar demanda \n Erro: ${err.name}\n
        Mensagem: ${err.message}\n Os parametros estao certos?`);
    }
  }
}
