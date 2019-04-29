import { Injectable } from '@nestjs/common';
import { Produto } from 'src/doacaodesangue/model/produto.entity';

@Injectable()
export class ProdutoService {
  async readAll(): Promise<Produto[] | any> {
    return [
      {
        id: 2,
        nome: 'Compartilhando sangue bom',
        quantidade: 30,
        descricao: '',
        valorunitario: 19.9,
        categoria: 'Camisa',
        tamanho: 'P',
        volume: 'Não Possui',
        material: 'Algodão',
        genero: 'Masculino',
      },
      {
        id: 1,
        nome: 'Sou um herói!',
        quantidade: 10,
        descricao: 'T-shirt',
        valorunitario: 15.5,
        categoria: 'Camisa',
        tamanho: 'GG',
        volume: 'Não Possui',
        material: 'Malha',
        genero: 'Feminino',
      },
      {
        id: 3,
        nome: 'Sangue bom',
        quantidade: 40,
        descricao: '',
        valorunitario: 29.9,
        categoria: 'Caneca',
        tamanho: 'Não especificado',
        volume: '300',
        material: 'Porcelana',
        genero: 'Unissex',
      },
      {
        id: 4,
        nome: 'Doe sangue, deo vida!',
        quantidade: 40,
        descricao: '',
        valorunitario: 29.9,
        categoria: 'Botton',
        tamanho: 'M',
        volume: 'Não Possui',
        material: 'Plastico',
        genero: 'Unissex',
      },
    ];
  }

  async readOne(id: number): Promise<{} | any> {
    if (id == 2) {
      return {
        id: 2,
        nome: 'Compartilhando sangue bom',
        descricao: '',
        quantidade: 30,
        valorunitario: 19.9,
      };
    } else {
      return 'Produto não encontrado';
    }
  }

  async Create(body: any): Promise<{}> {
    if (body.nome == 'Doe sangue!') {
      return [
        {
          id: 4,
          nome: 'Doe sangue!',
          quantidade: 40,
          descricao: '',
          valorunitario: 29.9,
          categoria: 'Botton',
          tamanho: 'M',
          volume: 'Não Possui',
          material: 'Plastico',
          genero: 'Unissex',
        },
      ];
    } else {
      return 'Produto não existente!';
    }
  }

  // Drop(body: any): Promise<Produto> {
  //   throw new Error('Method not implemented.');
  // }

  // async Update(body: any): Promise<Produto> {
  //   throw new Error('Method not implemented.');
  // }

  async buscaProdutoParam(texto): Promise<{} | any> {
    if (texto.texto == 'doe') {
      return [
        {
          id: 4,
          nome: 'Doe sangue, deo vida!',
          quantidade: 40,
          descricao: '',
          valorunitario: 29.9,
          categoria: 'Botton',
          tamanho: 'M',
          volume: 'Não Possui',
          material: 'Plastico',
          genero: 'Unissex',
        },
      ];
    } else {
      return 'Nenhum produto encontrado na busca';
    }
  }

  async buscaCamisas(): Promise<Produto | any> {
    return [
      {
        id: 1,
        nome: 'Sou um herói!',
        quantidade: 10,
        descricao: 'T-shirt',
        valorunitario: 15.5,
        categoria: 'Camisa',
        tamanho: 'GG',
        volume: 'Não Possui',
        material: 'Malha',
        genero: 'Feminino',
      },
      {
        id: 2,
        nome: 'Compartilhando sangue bom',
        quantidade: 30,
        descricao: '',
        valorunitario: 19.9,
        categoria: 'Camisa',
        tamanho: 'P',
        volume: 'Não Possui',
        material: 'Algodão',
        genero: 'Masculino',
      },
    ];
  }

  // async buscaBottons(): Promise<Produto | any> {
  //   return await Produto.createQueryBuilder('produto')
  //     .select(
  //       'produto.id, produto.nome, produto.quantidade, produto.descricao, produto.valorunitario, categoria.nome as categoria, tamanho.tamanho as tamanho, volume.quantidade as volume, material.material as material, genero.genero as genero',
  //     )
  //     .innerJoin('produto.categoria', 'categoria')
  //     .innerJoin('produto.tamanho', 'tamanho')
  //     .innerJoin('produto.volume', 'volume')
  //     .innerJoin('produto.material', 'material')
  //     .innerJoin('produto.genero', 'genero')
  //     .where('categoria.nome ILIKE :name', { name: 'Botton' })
  //     .getRawMany();
  // }

  // async buscaCanecas(): Promise<Produto | any> {
  //   return await Produto.createQueryBuilder('produto')
  //     .select(
  //       'produto.id, produto.nome, produto.quantidade, produto.descricao, produto.valorunitario, categoria.nome as categoria, tamanho.tamanho as tamanho, volume.quantidade as volume, material.material as material, genero.genero as genero',
  //     )
  //     .innerJoin('produto.categoria', 'categoria')
  //     .innerJoin('produto.tamanho', 'tamanho')
  //     .innerJoin('produto.volume', 'volume')
  //     .innerJoin('produto.material', 'material')
  //     .innerJoin('produto.genero', 'genero')
  //     .where('categoria.nome ILIKE :name', { name: 'Caneca' })
  //     .getRawMany();
  // }
}
