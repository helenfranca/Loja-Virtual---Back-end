import { genericInterface } from '../interface/generic.interface';
import { Injectable } from '@nestjs/common';
import { Hemocentro } from '../../model/hemocentro.entity';
import { Funcionamento } from '../../model/funcionamento.entity';
import { TipoSanguineoEnum } from '../../model/Enum';

@Injectable()
export class HemocentroService implements genericInterface<Hemocentro> {
  async readAll(): Promise<Hemocentro[]> {
    let hemo = new Hemocentro();
    hemo.doacao = [];
    hemo.email = 'hemo@hemo.gov.es.br';
    hemo.funcionamento = [new Funcionamento()];
    hemo.id = 0;
    hemo.nome = 'HemoES';
    hemo.senha = 'HemoPass';
    hemo.status = true;
    hemo.telefone = '02732145678';
    hemo.cnes = '1232313';
    hemo.demanda = [];
    return [hemo, hemo];
  }
  async readOne(id: number): Promise<Hemocentro> {
    let hemo = new Hemocentro();
    hemo.doacao = [];
    hemo.email = 'hemo@hemo.gov.es.br';
    hemo.funcionamento = [new Funcionamento()];
    hemo.id = 0;
    hemo.nome = 'HemoES';
    hemo.senha = 'HemoPass';
    hemo.status = true;
    hemo.telefone = '02732145678';
    hemo.cnes = '1232313';
    hemo.demanda = [];
    if (id === hemo.id) return hemo;
    else new Hemocentro();
  }
  async Create(body: any): Promise<Hemocentro> {
    let hemo = new Hemocentro();
    hemo.doacao = [];
    hemo.email = 'hemo@hemo.gov.es.br';
    hemo.funcionamento = [new Funcionamento()];
    hemo.id = 0;
    hemo.nome = 'HemoES';
    hemo.senha = 'HemoPass';
    hemo.status = true;
    hemo.telefone = '02732145678';
    hemo.cnes = '1232313';
    hemo.demanda = [];
    return hemo;
  }
  async Drop(body: Hemocentro): Promise<Hemocentro> {
    let hemo: Hemocentro = await this.Create(body);
    return hemo;
  }
  async Update(body: any): Promise<Hemocentro> {
    let hemoc: Hemocentro = await this.Drop(body);
    return hemoc;
  }
  async hemocentroDemanda() {
    return [
      {
        qtddemanda: 234,
        hemocentro: 'HemoCap',
        tiposanguineo: TipoSanguineoEnum.Bpos,
      },
      {
        qtddemanda: 23,
        hemocentro: 'Hemocentro',
        tiposanguineo: TipoSanguineoEnum.Apos,
      },
    ];
  }

  async hemocentro(body) {
    let hemo = await this.Create(body);
    return hemo;
  }
}
