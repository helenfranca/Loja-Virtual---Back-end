import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Double,
  ManyToOne,
  Entity,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Produto } from './produto.entity';

@Entity()
export class ItemCompra extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: false })
  quantidade: number;

  @Column({ type: 'float', nullable: false })
  valorAtual: Double;

  @ManyToOne(type => Produto, produto => produto.id)
  produto: Produto;
}
