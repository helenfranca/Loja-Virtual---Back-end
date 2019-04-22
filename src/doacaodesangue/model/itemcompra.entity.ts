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
  valorAtual: Double;

  @ManyToOne(type => Produto, produto => produto.itemCompra)
  @JoinColumn({ name: 'idproduto' })
  produto: Produto;

  @OneToMany(type => Compra, compra => compra.itemcompra)
  compra: Compra[];
}
