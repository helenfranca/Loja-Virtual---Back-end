import { Produto } from 'src/doacaodesangue/model/produto.entity';
import { genericInterface } from './interface/generic.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProdutoService implements genericInterface<Produto> {
  readAll(): Promise<Produto[]> {

    return Produto.find();
  }
  readOne(id: number): Promise<Produto> {
    return Produto.findOne({ id: id });
  }

  async Create(body: any): Promise<Produto> {
    let produto = new Produto();
    try {
      produto.nome = body.nome;
      produto.quantidade = body.quantidade;
      produto.descricao = body.descricao;
      produto.tipo = body.tipo;
      return await Produto.save(produto);
    } catch (err) {
      throw new Error(
        `Erro ao salvar Produto \n Erro: ${err.name}\n Mensagem: ${
          err.message
        }\n Os parametros estao certos?`,
      );
    }
  }

  Drop(body: any): Promise<Produto> {
    throw new Error('Method not implemented.');
  }

  async Update(body: any): Promise<Produto> {
    try {
      let busca = await Produto.findOne({ id: body.id });
      busca.nome = body.nome;
      busca.quantidade = body.quantidade;
      busca.descricao = body.descricao;
      busca.tipo = body.tipo;
      return await Produto.save(busca);
    } catch (err) {
      throw new Error(
        `Erro ao atualizar Produto \n Erro: ${err.name}\n Mensagem: ${
          err.message
        }\n Os parametros estao certos?`,
      );
    }
 
  }
}
