import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Categoria } from './categoria.entity';

@Entity()
export class Volume extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 10, nullable: false })
  volume: string;

  @OneToOne(type => Categoria)
  @JoinColumn({ name: 'idcategoria' })
  categoria: Categoria;
}
