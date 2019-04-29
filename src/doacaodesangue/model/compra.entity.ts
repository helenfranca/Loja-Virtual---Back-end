import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Double,
  OneToOne,
  JoinColumn,
  ManyToOne,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { ItemCompra } from './itemcompra.entity';
import { Endereco } from './endereco.entity';
import { Pessoa } from './pessoa.entity';
import { Produto } from './produto.entity';

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

  @OneToMany(type => ItemCompra, itemcompra => itemcompra.compra)
  itemcompra: ItemCompra;

  @ManyToOne(type => Endereco, endereco => endereco.compra, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'idendereco' })
  endereco: Endereco;

  @OneToOne(type => Pessoa) //// Olhar aqui
  @JoinColumn({ name: 'idpessoa' })
  pessoa: Pessoa;
}
