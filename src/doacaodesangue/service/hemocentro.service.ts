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
    let hemocentro = new Hemocentro();
    let cripto = new CriptografiaService();
    try {
      hemocentro.nome = body.nome;
      hemocentro.cnes = body.cnes;
      hemocentro.telefone = body.telefone;
      hemocentro.email = body.email;
      hemocentro.senha = cripto.criptografar(body.senha);
      hemocentro.status = true;
      return await Hemocentro.save(hemocentro);
    } catch (err) {
      throw new Error(
        `Erro ao salvar Hemocentro \n Erro: ${err.name}\n Mensagem: ${
          err.message
        }\n Os parametros estao certos?`,
      );
    }
  }

  async Drop(body: any): Promise<Hemocentro> {
    try {
      let hemocentro = await Hemocentro.findOne(body.id);
      hemocentro.status = false;
      return await Hemocentro.save(hemocentro);
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
      let cripto = new CriptografiaService();
      let busca = await Hemocentro.findOne({ cnes: body.cnes });
      busca.nome = body.nome;
      busca.cnes = body.cnes;
      busca.telefone = body.telefone;
      busca.email = body.email;
      let senha = body.senha;
      busca.senha = cripto.criptografar(senha);
      return await Hemocentro.save(busca);
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
}
