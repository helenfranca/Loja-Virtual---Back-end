import { genericInterface } from './interface/generic.interface';
import { Injectable } from '@nestjs/common';
import { Doador } from '../model/doador.entity';
import { Pessoa } from '../model/pessoa.entity';
import { TipoSanguineoService } from './tiposanguineo.service';

@Injectable()
export class DoadorService implements genericInterface<Doador> {
  readAll(): Promise<Doador[]> {
    return Doador.createQueryBuilder('doador')
      .select('doador.id, pessoa.nome, pessoa.email, tiposanguineo.tipofator')
      .innerJoin('doador.pessoa', 'pessoa')
      .innerJoin('doador.tiposanguineo', 'tiposanguineo')
      .getRawMany();
  }

  readOne(id: number): Promise<Doador> {
    return Doador.createQueryBuilder('doador')
      .select('doador.id, pessoa.nome, pessoa.email, tiposanguineo.tipofator')
      .innerJoin('doador.pessoa', 'pessoa')
      .innerJoin('doador.tiposanguineo', 'tiposanguineo')
      .where('doador.id = :name', { name: id })
      .getRawOne();
  }

  aptos(): Promise<Doador[]> {
    return Doador.createQueryBuilder('doador')
      .select('doador.id, pessoa.nome, pessoa.email,tiposanguineo.tipofator')
      .innerJoin('doador.pessoa', 'pessoa')
      .innerJoin('doador.tiposanguineo', 'tiposanguineo')
      .where('doador.apto = true')
      .getRawMany();
  }

  async Create(body: any): Promise<Doador> {
    let doador = new Doador();
    try {
      let pessoa = await Pessoa.findOne({ cpf: body.cpf });
      let tipo = new TipoSanguineoService();
      let tiposangue = await tipo.buscaOne(body.tiposanguineo);

      doador.pessoa = pessoa;
      doador.tiposanguineo = tiposangue;
      doador.doenca_chagas = body.chagas;
      doador.drogailicita = body.droga;
      doador.hepatite11 = body.hepatite11;
      doador.hepatiteb = body.hepatiteb;
      doador.hepatitec = body.hepatitec;
      doador.hiv = body.hiv;
      doador.htlv = body.htlv;
      doador.malaria = body.malaria;

      if (
        (body.chagas ||
          body.droga ||
          body.hepatite11 ||
          body.hepatiteb ||
          body.hepatitec ||
          body.hiv ||
          body.htlv ||
          body.malaria) == true
      ) {
        doador.apto = false;
      } else {
        doador.apto = true;
      }

      return await Doador.save(doador);
    } catch (err) {
      throw new Error(
        `Erro ao salvar doador \n Erro: ${err.name}\n Mensagem: ${
          err.message
        }\n Os parametros estao certos?`,
      );
    }
  }

  async Drop(body: any): Promise<Doador> {
    let busca = await Doador.findOne({ id: body.id });
    busca.apto = false;
    return await Doador.save(busca);
  }

  async Update(body: any): Promise<Doador> {
    try {
      let busca = await Doador.findOne({ id: body.id });
      //Saude
      busca.doenca_chagas = body.chagas;
      busca.drogailicita = body.droga;
      busca.hepatite11 = body.hepatite11;
      busca.hepatiteb = body.hepatiteb;
      busca.hepatitec = body.hepatitec;
      busca.hiv = body.hiv;
      busca.htlv = body.htlv;
      busca.malaria = body.malaria;

      if (
        (body.chagas ||
          body.droga ||
          body.hepatite11 ||
          body.hepatiteb ||
          body.hepatitec ||
          body.hiv ||
          body.htlv ||
          body.malaria) == true
      ) {
        busca.apto = false;
      }
      return await Doador.save(busca);
    } catch (err) {
      throw new Error(
        `Erro ao atualizar doador \n Erro: ${err.name}\n Mensagem: ${
          err.message
        }\n Os parametros estao certos?`,
      );
    }
  }
}
