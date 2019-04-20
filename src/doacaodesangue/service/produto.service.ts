import { genericInterface } from './interface/generic.interface';
import { Injectable } from '@nestjs/common';
import { Produto } from '../model/produto.entity';

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
      produto.categoria = body.tipo;
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
      busca.categoria = body.tipo;
      return await Produto.save(busca);
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
      .select('produto.nome, produto.quantidade, produto.tipo')
      .where('produto.nome ILIKE :name', { name: `%${texto}%` })
      .getRawMany();
  }

  async buscaCamisas(): Promise<Produto | any> {
    return await Produto.createQueryBuilder('produto')
      .select('produto.nome, produto.quantidade, produto.tipo')
      .where('produto.tipo ILIKE :name', { name: 'Camisa' })
      .getRawMany();
  }

  async buscaBotons(): Promise<Produto | any> {
    return await Produto.createQueryBuilder('produto')
      .select('produto.nome, produto.quantidade, produto.tipo')
      .where('produto.tipo ILIKE :name', { name: 'Boton' })
      .getRawMany();
  }

  async buscaCanecas(): Promise<Produto | any> {
    return await Produto.createQueryBuilder('produto')
      .select('produto.nome, produto.quantidade, produto.tipo')
      .where('produto.tipo ILIKE :name', { name: 'Caneca' })
      .getRawMany();
  }
}
