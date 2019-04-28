import { genericInterface } from './interface/generic.interface';
import { Injectable } from '@nestjs/common';
import { Hemocentro } from '../model/hemocentro.entity';

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
    try {
      hemocentro.nome = body.nome;
      hemocentro.cnes = body.cnes;
      hemocentro.telefone = body.telefone;
      hemocentro.email = body.email;
      hemocentro.senha = body.senha;
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
      let aExcluir = await Hemocentro.findOne(body.id);
      await Hemocentro.delete(aExcluir);
      return aExcluir;
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
      let busca = await Hemocentro.findOne({ cnes: body.cnes });
      busca.nome = body.nome;
      busca.cnes = body.cnes;
      busca.telefone = body.telefone;
      busca.email = body.email;
      busca.senha = body.senha;
      return await Hemocentro.save(busca);
    } catch (err) {
      throw new Error(
        `Erro ao atualizar Hemocentro \n Erro: ${err.name}\n Mensagem: ${
          err.message
        }\n Os parametros estao certos?`,
      );
    }
  }
}
