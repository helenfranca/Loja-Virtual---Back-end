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
      let produto = new Produto();
      produto.nome = body.nome;
      produto.quantidade = body.quantidade;
      produto.descricao = body.descricao;
      produto.valorunitario = body.valorunitario;

      let tipo = new CaracteristicasProdutoService();
      let categoria = await tipo.buscaOneCategoria(body.idcategoria);

      if (categoria != undefined) {
        produto.categoria = categoria;

        let material = await tipo.buscaOneMaterial(body.idmaterial);
        if (material != undefined) {
          produto.material = material;

          let tamanho = await tipo.buscaOneTamanho(body.idtamanho);
          if (tamanho != undefined) {
            produto.tamanho = tamanho;

            let genero = await tipo.buscaOneGenero(body.idgenero);
            if (genero != undefined) {
              produto.genero = genero;

              let volume = await tipo.buscaOneVolume(body.idvolume);
              if (volume != undefined) {
                produto.volume = volume;

                return await Produto.save(produto);
              } else {
                console.log('volume');
              }
            } else {
              console.log('genero');
            }
          } else {
            console.log('tamanho');
          }
        } else {
          console.log('material');
        }
      } else {
        console.log('categoria');
      }
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
      let produto = await Produto.findOne({ id: body.id });

      produto.nome = body.nome;
      produto.quantidade = body.quantidade;
      produto.descricao = body.descricao;
      produto.valorunitario = body.valorunitario;

      let tipo = new CaracteristicasProdutoService();
      let categoria = await tipo.buscaOneCategoria(body.idcategoria);

      if (categoria != undefined) {
        produto.categoria = categoria;

        let material = await tipo.buscaOneMaterial(body.idmaterial);
        if (material != undefined) {
          produto.material = material;

          let tamanho = await tipo.buscaOneTamanho(body.idtamanho);
          if (tamanho != undefined) {
            produto.tamanho = tamanho;

            let genero = await tipo.buscaOneGenero(body.idgenero);
            if (genero != undefined) {
              produto.genero = genero;

              let volume = await tipo.buscaOneVolume(body.idvolume);
              if (volume != undefined) {
                produto.volume = volume;

                return await Produto.save(produto);
              } else {
                console.log('volume');
              }
            } else {
              console.log('genero');
            }
          } else {
            console.log('tamanho');
          }
        } else {
          console.log('material');
        }
      } else {
        console.log('categoria');
      }
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
