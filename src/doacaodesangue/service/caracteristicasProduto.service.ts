import { Injectable } from '@nestjs/common';
import { Categoria } from '../model/categoria.entity';
import { Material } from '../model/material.entity';
import { Tamanho } from '../model/tamanho.entity';
import { Genero } from '../model/genero.entity';
import { Volume } from '../model/volume.entity';

@Injectable()
export class CaracteristicasProdutoService {
  buscaOneCategoria(nome: string) {
    return Categoria.createQueryBuilder('categoria')
      .select('categoria.*')
      .where('categoria.nome = :name', { name: nome })
      .getRawOne();
  }

  async createCategoria(categoria: Categoria) {
    return await Categoria.save(categoria);
  }

  buscaOneMaterial(material: string) {
    return Material.createQueryBuilder('material')
      .select('material.*')
      .where('material.material = :name', { name: material })
      .getRawOne();
  }

  buscaOneTamanho(tamanho: string) {
    return Tamanho.createQueryBuilder('tamanho')
      .select('tamanho.*')
      .where('tamanho.tamanho = :name', { name: tamanho })
      .getRawOne();
  }

  buscaOneGenero(genero: string) {
    return Genero.createQueryBuilder('genero')
      .select('genero.*')
      .where('genero.genero = :name', { name: genero })
      .getRawOne();
  }

  buscaOneVolume(qtd: string) {
    return Volume.createQueryBuilder('volume')
      .select('volume.*')
      .where('volume.quantidade = :name', { name: qtd })
      .getRawOne();
  }

  buscaUrl(url: string) {
    return Volume.createQueryBuilder('imagem')
      .select('imagem.*')
      .where('imagem.url = :name', { name: url })
      .getRawOne();
  }
}
