import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Entity,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Material } from './material.entity';
import { Tamanho } from './tamanho.entity';

export enum CategoriaEnum {
  Camisa = 'Camisa',
  Botton = 'Botton',
  Caneca = 'Caneca',
}

@Entity()
export class Categoria extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 10, nullable: false })
  categoria: CategoriaEnum;

  @OneToMany(type => Material, material => material.id)
  @JoinColumn({ name: 'idmaterial' })
  material: Material[];

  @OneToMany(type => Tamanho, tamanho => tamanho.id)
  @JoinColumn({ name: 'idtamanho' })
  tamanho: Tamanho[];
}
