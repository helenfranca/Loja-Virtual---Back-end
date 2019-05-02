import { genericInterface } from './interface/generic.interface';
import { Injectable } from '@nestjs/common';
import { Doador } from '../model/doador.entity';
import { Pessoa } from '../model/pessoa.entity';

@Injectable()
export class DoadorService implements genericInterface<Doador> {
  readAll(): Promise<Doador[]> {
    return Doador.createQueryBuilder('doador')
      .select('doador.id, pessoa.nome,tiposanguineo.tipofator')
      .innerJoin('doador.pessoa', 'pessoa')
      .innerJoin('doador.tiposanguineo', 'tiposanguineo')
      .getRawMany();
  }

  readOne(id: number): Promise<Doador> {
    return Doador.createQueryBuilder('doador')
      .select('doador.id, pessoa.nome,tiposanguineo.tipofator')
      .innerJoin('doador.pessoa', 'pessoa')
      .innerJoin('doador.tiposanguineo', 'tiposanguineo')
      .where('doador.id = :name', { name: id })
      .getRawOne();
  }

  async Create(body: any): Promise<Doador> {
    let doador = new Doador();
    try {
      let pessoa = await Pessoa.findOne({ cpf: body.cpf });
      doador.pessoa = pessoa;
      doador.tiposanguineo = body.tiposanguineo;
      return await Doador.save(doador);
    } catch (err) {
      throw new Error(
        `Erro ao salvar doador \n Erro: ${err.name}\n Mensagem: ${
          err.message
        }\n Os parametros estao certos?`,
      );
    }
  }

  Drop(body: any): Promise<Doador> {
    throw new Error('Method not implemented.');
  }

  async Update(body: any): Promise<Doador> {
    try {
      let busca = await Doador.findOne({ id: body.id });
      busca.tiposanguineo = body.tiposanguineo;
      return await Doador.save(busca);
    } catch (err) {
      throw new Error(
        `Erro ao atualizar doação \n Erro: ${err.name}\n Mensagem: ${
          err.message
        }\n Os parametros estao certos?`,
      );
    }
  }
}
