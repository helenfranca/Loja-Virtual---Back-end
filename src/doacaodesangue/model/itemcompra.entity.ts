import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Double,
  ManyToOne,
  Entity,
  OneToMany,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Produto } from './produto.entity';
import { Compra } from './compra.entity';

@Entity()
export class ItemCompra extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: false })
  quantidade: number;

  @Column({ type: 'float', nullable: false })
  valoratual: Double;

  @ManyToOne(type => Compra, compra => compra.itemcompra, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'idcompra' })
  compra: Compra;

  @ManyToOne(type => Produto, produto => produto.itemcompra, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'idproduto' })
  produto: Produto;
}
