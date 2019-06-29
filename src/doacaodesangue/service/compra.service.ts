// ~~ Parte Service
// Montar os objetos na camada anterior, na camada de lógica
// A partir de agora no serviço só vai constar a comunicação do banco

import { Injectable } from '@nestjs/common';
import { genericInterface } from './interface/generic.interface';
import { Compra } from '../model/compra.entity';

@Injectable()
export class CompraService implements genericInterface<Compra> {
  readAll(): Promise<Compra[]> {
    return Compra.createQueryBuilder('compra')
      .select("compra")
      .getMany();
  }

  readOne(id: number): Promise<Compra> {
    return Compra.createQueryBuilder('comrpra')
      .select("compra")
      .innerJoin('compra.itemcompra', 'itemcompra')
      .where('compra.id = :id', { id: id })
      .getRawOne();
  }


  async Create(body: Compra): Promise<Compra> {
    try {
      return await Compra.save(body);
    } catch (err) {
      throw new Error(
        `Erro ao salvar demanda \n Erro: ${err.name}\n Mensagem: ${
          err.message
        }\n Os parametros estao certos?`,
      );
    }
  }
  async Drop(body: any): Promise<Compra> {
    try {
      return await Compra.save(body);
    } catch (err) {
      throw new Error(
        `Erro ao apagar pessoa \n Erro: ${err.name}\n Mensagem: ${
          err.message
        }\n Os parametros estao certos?`,
      );
    }
  }
  Update(body: any): Promise<Compra> {
    throw new Error('Method not implemented.');
  }
}
