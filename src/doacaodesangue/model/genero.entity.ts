import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Categoria } from './categoria.entity';

export enum GeneroEnum {
  Feminino = 'Feminino',
  Masculino = 'Masculino',
}

@Entity()
export class Genero extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 10, nullable: false })
  genero: GeneroEnum;

  @OneToOne(type => Categoria)
  @JoinColumn({ name: 'idcategoria' })
  categoria: Categoria;
}
