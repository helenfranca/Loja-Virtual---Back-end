import { genericInterface } from './interface/generic.interface';
import { Injectable } from '@nestjs/common';
import { Produto } from '../model/produto.entity';
import { CaracteristicasProdutoService } from './caracteristicasProduto.service';

@Injectable()
export class ProdutoService implements genericInterface<Produto> {
  readAll(): Promise<Produto[]> {
    return Produto.createQueryBuilder('produto')
      .select(
        'produto.id, produto.nome, produto.quantidade, produto.descricao, produto.valorunitario, categoria.nome as categoria, tamanho.tamanho as tamanho, volume.quantidade as volume, material.material as material, genero.genero as genero',
      )
      .innerJoin('produto.categoria', 'categoria')
      .innerJoin('produto.tamanho', 'tamanho')
      .innerJoin('produto.volume', 'volume')
      .innerJoin('produto.material', 'material')
      .innerJoin('produto.genero', 'genero')
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

  Drop(body: any): Promise<Produto> {
    throw new Error('Method not implemented.');
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

  async buscaCamisas(): Promise<Produto | any> {
    return await Produto.createQueryBuilder('produto')
      .select(
        'produto.id, produto.nome, produto.quantidade, produto.descricao, produto.valorunitario, categoria.nome as categoria, tamanho.tamanho as tamanho, volume.quantidade as volume, material.material as material, genero.genero as genero',
      )
      .innerJoin('produto.categoria', 'categoria')
      .innerJoin('produto.tamanho', 'tamanho')
      .innerJoin('produto.volume', 'volume')
      .innerJoin('produto.material', 'material')
      .innerJoin('produto.genero', 'genero')
      .where('categoria.nome ILIKE :name', { name: 'Camisa' })
      .getRawMany();
  }

  async buscaBottons(): Promise<Produto | any> {
    return await Produto.createQueryBuilder('produto')
      .select(
        'produto.id, produto.nome, produto.quantidade, produto.descricao, produto.valorunitario, categoria.nome as categoria, tamanho.tamanho as tamanho, volume.quantidade as volume, material.material as material, genero.genero as genero',
      )
      .innerJoin('produto.categoria', 'categoria')
      .innerJoin('produto.tamanho', 'tamanho')
      .innerJoin('produto.volume', 'volume')
      .innerJoin('produto.material', 'material')
      .innerJoin('produto.genero', 'genero')
      .where('categoria.nome ILIKE :name', { name: 'Botton' })
      .getRawMany();
  }

  async buscaCanecas(): Promise<Produto | any> {
    return await Produto.createQueryBuilder('produto')
      .select(
        'produto.id, produto.nome, produto.quantidade, produto.descricao, produto.valorunitario, categoria.nome as categoria, tamanho.tamanho as tamanho, volume.quantidade as volume, material.material as material, genero.genero as genero',
      )
      .innerJoin('produto.categoria', 'categoria')
      .innerJoin('produto.tamanho', 'tamanho')
      .innerJoin('produto.volume', 'volume')
      .innerJoin('produto.material', 'material')
      .innerJoin('produto.genero', 'genero')
      .where('categoria.nome ILIKE :name', { name: 'Caneca' })
      .getRawMany();
  }
}
