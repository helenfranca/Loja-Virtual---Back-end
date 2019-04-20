import {
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  Double,
  OneToMany,
  Entity,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { ItemCompra } from './itemcompra.entity';
import { Categoria } from './categoria.entity';

@Entity()
export class Produto extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  nome: string;

  @Column({ type: 'varchar', length: 250, nullable: false })
  descricao: string;

  @Column({ type: 'int', nullable: false })
  quantidade: number;

  @Column({ type: 'float', nullable: false })
  valor: Double;

  @OneToMany(type => ItemCompra, itemCompra => itemCompra.id, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'iditemcompra' })
  itemCompra: ItemCompra;

  @OneToOne(type => Categoria)
  @JoinColumn({ name: 'idcategoria' })
  categoria: Categoria;
}