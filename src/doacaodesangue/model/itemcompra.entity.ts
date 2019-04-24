import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Double,
  ManyToOne,
  Entity,
  JoinColumn,
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

  @ManyToOne(() => Compra, compra => compra.itemcompra, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'idcompra' })
  compra: Compra;

  @ManyToOne(() => Produto, produto => produto.itemcompra, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'idproduto' })
  produto: Produto;
}
