import { Injectable } from '@nestjs/common';
import { Categoria } from '../model/categoria.entity';
import { Material } from '../model/material.entity';
import { Tamanho } from '../model/tamanho.entity';
import { Genero } from '../model/genero.entity';
import { Volume } from '../model/volume.entity';
import { Imagem } from '../model/imagem.entity';

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

  async createMaterial(material: Material) {
    return await Material.save(material);
  }

  buscaOneTamanho(tamanho: string) {
    return Tamanho.createQueryBuilder('tamanho')
      .select('tamanho.*')
      .where('tamanho.tamanho = :name', { name: tamanho })
      .getRawOne();
  }

  async createTamanho(tamanho: Tamanho) {
    return await Tamanho.save(tamanho);
  }

  buscaOneGenero(genero: string) {
    return Genero.createQueryBuilder('genero')
      .select('genero.*')
      .where('genero.genero = :name', { name: genero })
      .getRawOne();
  }

  async createGenero(genero: Genero) {
    return await Genero.save(genero);
  }

  buscaOneVolume(qtd: string) {
    return Volume.createQueryBuilder('volume')
      .select('volume.*')
      .where('volume.quantidade = :name', { name: qtd })
      .getRawOne();
  }
  async createVolume(volume: Volume) {
    return await Volume.save(volume);
  }

  buscaUrl(url: string): Promise<Imagem> {
    return Imagem.findOne({ url: url });
  }

  async createImagem(imagem: Imagem) {
    return await Imagem.save(imagem);
  }

  async buscaTodasCategorias() {
    return Categoria.createQueryBuilder("categoria")
    .select("categoria.*")
    .getRawMany();
  }

  async buscaTodosVolumes() {
    return Volume.createQueryBuilder("volume")
    .select("volume.*")
    .getRawMany();
  }

  async buscaTodosGeneros() {
    return Genero.createQueryBuilder("genero")
    .select("genero.*")
    .getRawMany();
  }
}
