import { Hemocentro } from 'src/doacaodesangue/model/hemocentro.entity';
import { genericInterface } from './interface/generic.interface';
import { Injectable } from '@nestjs/common';

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
      hemocentro.cnpj = body.cnpj;
      hemocentro.telefone = body.telefone;
      hemocentro.cep = body.cep;
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

  Drop(body: any): Promise<Hemocentro> {
    throw new Error('Method not implemented.');
  }

  async Update(body: any): Promise<Hemocentro> {
    try {
      let busca = await Hemocentro.findOne({ cnpj: body.cnpj });
      busca.nome = body.nome;
      busca.cnpj = body.cnpj;
      busca.telefone = body.telefone;
      busca.cep = body.cep;
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
