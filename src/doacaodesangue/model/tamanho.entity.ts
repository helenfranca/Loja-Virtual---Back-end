import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Categoria } from './categoria.entity';

export enum TamanhoEnum {
  P = 'P',
  M = 'M',
  G = 'G',
}

@Entity()
export class Tamanho extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 10, nullable: false })
  tamanho: TamanhoEnum;

  @ManyToOne(type => Categoria, categoria => categoria.id)
  @JoinColumn({ name: 'idcategoria' })
  categoria: Categoria;
}
