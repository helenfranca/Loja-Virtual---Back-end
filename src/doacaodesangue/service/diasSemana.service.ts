import { Injectable } from '@nestjs/common';
import { DiasSemana, DiaSemanaEnum } from '../model/diassemana.entity';
import { genericInterface } from './interface/generic.interface';

@Injectable()
export class DiasSemanaService implements genericInterface<DiasSemana> {
  readAll(): Promise<DiasSemana[]> {
    throw new Error('Method not implemented.');
  }
  readOne(dia: string | number): Promise<DiasSemana> {
    return DiasSemana.findOne({ diaSemana: DiaSemanaEnum[dia] });
  }
  async Create(body: any): Promise<DiasSemana> {
    try {
      return await DiasSemana.save(body);
    } catch (err) {
      throw new Error(
        `Erro ao salvar Dia da semana \n Erro: ${err.name}\n Mensagem: ${
          err.message
        }\n Os parametros estao certos?`,
      );
    }
  }
  Drop(body: any): Promise<DiasSemana> {
    throw new Error('Method not implemented.');
  }
  Update(body: any): Promise<DiasSemana> {
    throw new Error('Method not implemented.');
  }
}
