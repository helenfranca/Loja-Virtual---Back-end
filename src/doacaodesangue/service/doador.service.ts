import { genericInterface } from './interface/generic.interface';
import { Injectable } from '@nestjs/common';
import { Doador } from '../model/doador.entity';

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

  async Create(body: Doador): Promise<Doador> {
    try {
      return await Doador.save(body);
    } catch (err) {
      throw new Error(
        `Erro ao salvar doador \n Erro: ${err.name}\n Mensagem: ${
          err.message
        }\n Os parametros estao certos?`,
      );
    }
  }

  async Drop(body: any): Promise<Doador> {
    return await Doador.save(body);
  }

  async Update(body: any): Promise<Doador> {
    return await Doador.save(body);
  }
  catch(err) {
    throw new Error(
      `Erro ao atualizar doador \n Erro: ${err.name}\n Mensagem: ${
        err.message
      }\n Os parametros estao certos?`,
    );
  }

  doadoresTipo() {
    let retorno = Doador.createQueryBuilder('doador')
      .select('count(doador.id) as qtddoador, tiposanguineo.tipofator')
      .innerJoin('doador.tiposanguineo', 'tiposanguineo')
      .groupBy('tiposanguineo.tipofator')
      .getRawMany();

    return retorno;
  }

  aptos(): Promise<Doador[]> {
    return Doador.createQueryBuilder('doador')
      .select('doador.id, pessoa.nome, pessoa.email,tiposanguineo.tipofator')
      .innerJoin('doador.pessoa', 'pessoa')
      .innerJoin('doador.tiposanguineo', 'tiposanguineo')
      .where('doador.apto = true')
      .getRawMany();
  }

  async aptosConvocacaoOpositivo(tipos) {
    return await Doador.createQueryBuilder('doador')
      .select('doador.id, pessoa.nome, pessoa.email,tiposanguineo.tipofator')
      .innerJoin('doador.pessoa', 'pessoa')
      .innerJoin('doador.tiposanguineo', 'tiposanguineo')
      .where('doador.apto = true and tiposanguineo.tipofator LIKE :op ', {
        op: tipos.Op,
      })
      .orWhere('doador.apto = true  and tiposanguineo.tipofator LIKE :on', {
        on: tipos.On,
      })
      .getRawMany();
  }

  async aptosConvocacaoOnegativo(tipos) {
    return await Doador.createQueryBuilder('doador')
      .select('doador.id, pessoa.nome, pessoa.email,tiposanguineo.tipofator')
      .innerJoin('doador.pessoa', 'pessoa')
      .innerJoin('doador.tiposanguineo', 'tiposanguineo')
      .where('doador.apto = true and tiposanguineo.tipofator LIKE :on ', {
        on: tipos.On,
      })
      .getRawMany();
  }

  async aptosConvocacaoApositivo(tipos) {
    return await Doador.createQueryBuilder('doador')
      .select('doador.id, pessoa.nome, pessoa.email,tiposanguineo.tipofator')
      .innerJoin('doador.pessoa', 'pessoa')
      .innerJoin('doador.tiposanguineo', 'tiposanguineo')
      .where('doador.apto = true and tiposanguineo.tipofator LIKE :ap ', {
        ap: tipos.Ap,
      })
      .orWhere('doador.apto = true  and tiposanguineo.tipofator LIKE :an', {
        an: tipos.An,
      })
      .orWhere('doador.apto = true  and tiposanguineo.tipofator LIKE :on', {
        on: tipos.On,
      })
      .orWhere('doador.apto = true  and tiposanguineo.tipofator LIKE :op', {
        op: tipos.Op,
      })
      .getRawMany();
  }

  async aptosConvocacaoAnegativo(tipos) {
    return await Doador.createQueryBuilder('doador')
      .select('doador.id, pessoa.nome, pessoa.email,tiposanguineo.tipofator')
      .innerJoin('doador.pessoa', 'pessoa')
      .innerJoin('doador.tiposanguineo', 'tiposanguineo')
      .where('doador.apto = true and tiposanguineo.tipofator LIKE :on ', {
        on: tipos.On,
      })
      .orWhere('doador.apto = true  and tiposanguineo.tipofator LIKE :an', {
        an: tipos.An,
      })
      .getRawMany();
  }

  async aptosConvocacaoABnegativo(tipos) {
    return await Doador.createQueryBuilder('doador')
      .select('doador.id, pessoa.nome, pessoa.email,tiposanguineo.tipofator')
      .innerJoin('doador.pessoa', 'pessoa')
      .innerJoin('doador.tiposanguineo', 'tiposanguineo')
      .where('doador.apto = true and tiposanguineo.tipofator LIKE :an', {
        an: tipos.An,
      })
      .orWhere('doador.apto = true  and tiposanguineo.tipofator LIKE :bn', {
        bn: tipos.Bn,
      })
      .orWhere('doador.apto = true  and tiposanguineo.tipofator LIKE :on', {
        on: tipos.On,
      })
      .orWhere('doador.apto = true  and tiposanguineo.tipofator LIKE :abn', {
        abn: tipos.ABn,
      })
      .getRawMany();
  }

  async aptosConvocacaoBpositivo(tipos) {
    return await Doador.createQueryBuilder('doador')
      .select('doador.id, pessoa.nome, pessoa.email,tiposanguineo.tipofator')
      .innerJoin('doador.pessoa', 'pessoa')
      .innerJoin('doador.tiposanguineo', 'tiposanguineo')
      .where('doador.apto = true and tiposanguineo.tipofator LIKE :bp', {
        bp: tipos.Bp,
      })
      .orWhere('doador.apto = true  and tiposanguineo.tipofator LIKE :bn', {
        bn: tipos.Bn,
      })
      .orWhere('doador.apto = true  and tiposanguineo.tipofator LIKE :on', {
        on: tipos.On,
      })
      .orWhere('doador.apto = true  and tiposanguineo.tipofator LIKE :op', {
        op: tipos.Op,
      })
      .getRawMany();
  }

  async aptosConvocacaoBnegativo(tipos) {
    return await Doador.createQueryBuilder('doador')
      .select('doador.id, pessoa.nome, pessoa.email,tiposanguineo.tipofator')
      .innerJoin('doador.pessoa', 'pessoa')
      .innerJoin('doador.tiposanguineo', 'tiposanguineo')
      .where('doador.apto = true  and tiposanguineo.tipofator LIKE :bn', {
        bn: tipos.Bn,
      })
      .orWhere('doador.apto = true  and tiposanguineo.tipofator LIKE :on', {
        on: tipos.On,
      })
      .getRawMany();
  }

  async doador(pessoa) {
    return await Doador.findOne({ pessoa: pessoa });
  }
}
