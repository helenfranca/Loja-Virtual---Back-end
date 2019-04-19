import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Double,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { ItemCompra } from './itemcompra.entity';
import { Endereco } from './endereco.entity';

@Entity()
export class Compra extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'boolean', nullable: false })
  status: boolean;

  @Column({ type: 'timestamp', nullable: false })
  data: Date;

  @Column({ type: 'boolean', nullable: false })
  pagamento: boolean;

  @Column({ type: 'float', nullable: false })
  valorTotal: Double;

  @ManyToOne(type => ItemCompra, itemcompra => itemcompra.id, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'iditemcompra' })
  itemcompra: ItemCompra;

  @ManyToOne(type => Endereco, endereco => endereco.compra, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'idendereco' })
  endereco: Endereco;
}
