import { Injectable } from '@nestjs/common';
import { Funcionamento, DiaSemanaEnum } from '../model/funcionamento.entity';
import { genericInterface } from './interface/generic.interface';

@Injectable()
export class FuncionamentoService implements genericInterface<Funcionamento> {
  readAll(): Promise<Funcionamento[]> {
    throw new Error('Method not implemented.');
  }
  readOne(body: any | number): Promise<Funcionamento> {
    return Funcionamento.findOne({
      horaAbertura: body.abertura,
      horaFechamento: body.fechamento,
    });
  }

  async findOne(idHemocentro: number, idDia: DiaSemanaEnum) {
    return Funcionamento
    .createQueryBuilder("funcionamento")
    .where("funcionamento.idHemocentro = :idH AND funcionamento.diaFuncionamento = :dia",
        {idH: idHemocentro, dia: idDia})
    .getOne();
  }

  async Create(horario: any): Promise<Funcionamento> {
    try {
      return await Funcionamento.save(horario);
    } catch (err) {
      throw new Error(
        `Erro ao salvar Horário de funcionamento \n Erro: ${
          err.name
        }\n Mensagem: ${err.message}\n Os parametros estao certos?`,
      );
    }
  }
  Drop(body: any): Promise<Funcionamento> {
    throw new Error('Method not implemented.');
  }
  async Update(body: any): Promise<Funcionamento> {
    try {
      return await Funcionamento.save(body);
    } catch (err) {
      throw new Error(
        `Erro ao atualizar Horario de funcionamento \n Erro: ${
          err.name
        }\n Mensagem: ${err.message}\n Os parametros estao certos?`,
      );
    }
  }
}
