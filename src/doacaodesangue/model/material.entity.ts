import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  Column,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Categoria } from './categoria.entity';

export enum MaterialEnum {
  Porcelana = 'Porcelana',
  Plastico = 'Plastico',
  Aluminio = 'Aluminio',
  Algodão = 'Algodão',
  Malha = 'Malha',
}

@Entity()
export class Material extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 10, nullable: false })
  material: MaterialEnum;

  @ManyToOne(type => Categoria, categoria => categoria.id)
  @JoinColumn({ name: 'idcategoria' })
  categoria: Categoria;
}
