import { genericInterface } from '../interface/generic.interface';
import { Injectable } from '@nestjs/common';
import { Doador } from '../../model/doador.entity';
import { TipoSanguineo } from '../../model/tiposanguineo.entity';
import { Pessoa } from '../../model/pessoa.entity';

@Injectable()
export class DoadorService implements genericInterface<Doador> {
  
  async readAll(): Promise<Doador[]> {
    let doador = new Doador();
    doador.id = 0
    doador.malaria = true;
    doador.htlv = true;
    doador.hiv = true;
    doador.hepatitec = false;
    doador.hepatiteb = false;
    doador.hepatite11 = false;
    doador.apto = false;
    doador.doenca_chagas = true;
    doador.drogailicita = false;
    doador.tiposanguineo = new TipoSanguineo();
    doador.doacao = [];
    doador.pessoa = new Pessoa();
    return [doador,doador];
  }

  async readOne(id: number): Promise<Doador> {
    let doador = new Doador();
    doador.id = 0
    doador.malaria = true;
    doador.htlv = true;
    doador.hiv = true;
    doador.hepatitec = false;
    doador.hepatiteb = false;
    doador.hepatite11 = false;
    doador.apto = false;
    doador.doenca_chagas = true;
    doador.drogailicita = false;
    doador.tiposanguineo = new TipoSanguineo();
    doador.doacao = [];
    doador.pessoa = new Pessoa();
    if(id=== doador.id) {
      return doador;
    }
  }

  async Create(body: Doador): Promise<Doador> {
    let doador = new Doador();
    doador.id = 0
    doador.malaria = true;
    doador.htlv = true;
    doador.hiv = true;
    doador.hepatitec = false;
    doador.hepatiteb = false;
    doador.hepatite11 = false;
    doador.apto = false;
    doador.doenca_chagas = true;
    doador.drogailicita = false;
    doador.tiposanguineo = new TipoSanguineo();
    doador.doacao = [];
    doador.pessoa = new Pessoa();
    return doador;
  }

  async Drop(body: any): Promise<Doador> {
    let doador = new Doador();
    doador.id = 0
    doador.malaria = true;
    doador.htlv = true;
    doador.hiv = true;
    doador.hepatitec = false;
    doador.hepatiteb = false;
    doador.hepatite11 = false;
    doador.apto = false;
    doador.doenca_chagas = true;
    doador.drogailicita = false;
    doador.tiposanguineo = new TipoSanguineo();
    doador.doacao = [];
    doador.pessoa = new Pessoa();
    return doador;
  }

  async Update(body: any): Promise<Doador> {
    let doador = new Doador();
    doador.id = 0
    doador.malaria = true;
    doador.htlv = true;
    doador.hiv = true;
    doador.hepatitec = false;
    doador.hepatiteb = false;
    doador.hepatite11 = false;
    doador.apto = false;
    doador.doenca_chagas = true;
    doador.drogailicita = false;
    doador.tiposanguineo = new TipoSanguineo();
    doador.doacao = [];
    doador.pessoa = new Pessoa();
    return doador;
  }

  doadoresTipo() {
    return [{qtddoador: 123, tiposanguineo:new TipoSanguineo()},
            {qtddoador: 321, tiposanguineo:new TipoSanguineo()}];
  }

  async aptos(): Promise<Doador[]> {
    let doador = new Doador();
    doador.id = 0
    doador.malaria = true;
    doador.htlv = true;
    doador.hiv = true;
    doador.hepatitec = false;
    doador.hepatiteb = false;
    doador.hepatite11 = false;
    doador.apto = false;
    doador.doenca_chagas = true;
    doador.drogailicita = false;
    doador.tiposanguineo = new TipoSanguineo();
    doador.doacao = [];
    doador.pessoa = new Pessoa();
    return [];
  }

  async aptosConvocacaoOpositivo(tipos) {
    let doador = new Doador();
    doador.id = 0
    doador.malaria = true;
    doador.htlv = true;
    doador.hiv = true;
    doador.hepatitec = false;
    doador.hepatiteb = false;
    doador.hepatite11 = false;
    doador.apto = false;
    doador.doenca_chagas = true;
    doador.drogailicita = false;
    doador.tiposanguineo = new TipoSanguineo();
    doador.doacao = [];
    doador.pessoa = new Pessoa();
    return [doador];
  }

  async aptosConvocacaoOnegativo(tipos) {
    let doador = new Doador();
    doador.id = 0
    doador.malaria = true;
    doador.htlv = true;
    doador.hiv = true;
    doador.hepatitec = false;
    doador.hepatiteb = false;
    doador.hepatite11 = false;
    doador.apto = false;
    doador.doenca_chagas = true;
    doador.drogailicita = false;
    doador.tiposanguineo = new TipoSanguineo();
    doador.doacao = [];
    doador.pessoa = new Pessoa();
    return [doador];
  }

  async aptosConvocacaoApositivo(tipos) {
    let doador = new Doador();
    doador.id = 0
    doador.malaria = true;
    doador.htlv = true;
    doador.hiv = true;
    doador.hepatitec = false;
    doador.hepatiteb = false;
    doador.hepatite11 = false;
    doador.apto = false;
    doador.doenca_chagas = true;
    doador.drogailicita = false;
    doador.tiposanguineo = new TipoSanguineo();
    doador.doacao = [];
    doador.pessoa = new Pessoa();
    return [doador];
  }

  async aptosConvocacaoAnegativo(tipos) {
    let doador = new Doador();
    doador.id = 0
    doador.malaria = true;
    doador.htlv = true;
    doador.hiv = true;
    doador.hepatitec = false;
    doador.hepatiteb = false;
    doador.hepatite11 = false;
    doador.apto = false;
    doador.doenca_chagas = true;
    doador.drogailicita = false;
    doador.tiposanguineo = new TipoSanguineo();
    doador.doacao = [];
    doador.pessoa = new Pessoa();
    return [doador];
  }

  async aptosConvocacaoABnegativo(tipos) {
    let doador = new Doador();
    doador.id = 0
    doador.malaria = true;
    doador.htlv = true;
    doador.hiv = true;
    doador.hepatitec = false;
    doador.hepatiteb = false;
    doador.hepatite11 = false;
    doador.apto = false;
    doador.doenca_chagas = true;
    doador.drogailicita = false;
    doador.tiposanguineo = new TipoSanguineo();
    doador.doacao = [];
    doador.pessoa = new Pessoa();
    return [doador];
  }

  async aptosConvocacaoBpositivo(tipos) {
    let doador = new Doador();
    doador.id = 0
    doador.malaria = true;
    doador.htlv = true;
    doador.hiv = true;
    doador.hepatitec = false;
    doador.hepatiteb = false;
    doador.hepatite11 = false;
    doador.apto = false;
    doador.doenca_chagas = true;
    doador.drogailicita = false;
    doador.tiposanguineo = new TipoSanguineo();
    doador.doacao = [];
    doador.pessoa = new Pessoa();
    return [doador];
  }

  async aptosConvocacaoBnegativo(tipos) {
    let doador = new Doador();
    doador.id = 0
    doador.malaria = true;
    doador.htlv = true;
    doador.hiv = true;
    doador.hepatitec = false;
    doador.hepatiteb = false;
    doador.hepatite11 = false;
    doador.apto = false;
    doador.doenca_chagas = true;
    doador.drogailicita = false;
    doador.tiposanguineo = new TipoSanguineo();
    doador.doacao = [];
    doador.pessoa = new Pessoa();
    return [doador];
  }

  async doador(pessoa) {
    let doador = new Doador();
    doador.id = 0
    doador.malaria = true;
    doador.htlv = true;
    doador.hiv = true;
    doador.hepatitec = false;
    doador.hepatiteb = false;
    doador.hepatite11 = false;
    doador.apto = false;
    doador.doenca_chagas = true;
    doador.drogailicita = false;
    doador.tiposanguineo = new TipoSanguineo();
    doador.doacao = [];
    doador.pessoa = new Pessoa();
    if (pessoa===pessoa) {
      return doador;
    }
    else {
      return new Doador();
    }
  }
}
