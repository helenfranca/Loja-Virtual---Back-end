import { genericInterface } from './interface/generic.interface';
import { Injectable } from '@nestjs/common';
import { Produto } from '../model/produto.entity';
import { ItemCompra } from '../model/itemcompra.entity';

@Injectable()
export class ProdutoService implements genericInterface<Produto> {
  readAll(): Promise<Produto[]> {
    return Produto.createQueryBuilder('produto')
      .select(
        'produto.id, produto.nome, produto.quantidade, produto.descricao, produto.valorunitario, categoria.nome as categoria, tamanho.tamanho as tamanho, volume.quantidade as volume, material.material as material, genero.genero as genero, imagem.url as url',
      )
      .innerJoin('produto.categoria', 'categoria')
      .innerJoin('produto.tamanho', 'tamanho')
      .innerJoin('produto.volume', 'volume')
      .innerJoin('produto.material', 'material')
      .innerJoin('produto.genero', 'genero')
      .innerJoin('produto.imagem', 'imagem')
      .getRawMany();
  }

  readOne(id: number): Promise<Produto> {
    return Produto.findOne({ id: id });
  }

  async Create(body: any): Promise<Produto> {
    try {
      return await Produto.save(body);
    } catch (err) {
      throw new Error(
        `Erro ao salvar Produto \n Erro: ${err.name}\n Mensagem: ${
          err.message
        }\n Os parametros estao certos?`,
      );
    }
  }

  async Drop(body: any): Promise<Produto> {
    try {
      return await Produto.remove(body);
    }
    catch(err) {
      throw new Error(
        `Erro ao excluir Produto \n Erro: ${err.name}\n Mensagem: ${
          err.message}`,
      );
    }
  }

  async Update(body: any): Promise<Produto> {
    try {
      return await Produto.save(body);
    } catch (err) {
      throw new Error(
        `Erro ao atualizar Produto \n Erro: ${err.name}\n Mensagem: ${
          err.message
        }\n Os parametros estao certos?`,
      );
    }
  }

  async buscaProdutoParam(texto): Promise<Produto | any> {
    return await Produto.createQueryBuilder('produto')
      .select(
        'produto.id, produto.nome, produto.quantidade, produto.descricao, produto.valorunitario, categoria.nome as categoria, tamanho.tamanho as tamanho, volume.quantidade as volume, material.material as material, genero.genero as genero',
      )
      .innerJoin('produto.categoria', 'categoria')
      .innerJoin('produto.tamanho', 'tamanho')
      .innerJoin('produto.volume', 'volume')
      .innerJoin('produto.material', 'material')
      .innerJoin('produto.genero', 'genero')
      .where('produto.nome ILIKE :name', { name: `%${texto}%` })
      .getRawMany();
  }

  async buscaProduto(param): Promise<Produto | any> {
    return await Produto.createQueryBuilder('produto')
      .select(
        'produto.id, produto.nome, produto.quantidade, produto.descricao, produto.valorunitario, categoria.nome as categoria, tamanho.tamanho as tamanho, volume.quantidade as volume, material.material as material, genero.genero as genero',
      )
      .innerJoin('produto.categoria', 'categoria')
      .innerJoin('produto.tamanho', 'tamanho')
      .innerJoin('produto.volume', 'volume')
      .innerJoin('produto.material', 'material')
      .innerJoin('produto.genero', 'genero')
      .where('categoria.nome ILIKE :name', { name: param })
      .getRawMany();
  }

  async buscaTop3Produtos() {
    return await Produto.createQueryBuilder('produto')
      .select(
        'produto.id, produto.nome, produto.valorunitario, itemcompra.quantidade, imagem.url',
      )
      .innerJoin('produto.itemcompra', 'itemcompra')
      .innerJoin('produto.imagem', 'imagem')
      .orderBy('produto.id')
      .getRawMany();
  }
}
