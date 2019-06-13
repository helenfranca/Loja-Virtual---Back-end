import {
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
  ManyToOne,
  JoinColumn,
  Entity,
} from 'typeorm';
import { Compra } from './compra.entity';
import { Bairro } from './bairro.entity';
import { Hemocentro } from './hemocentro.entity';

@Entity()
export class Endereco extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20, nullable: false })
  cep: string;

  // @Column({ type: 'int', nullable: false })
  // numero: number;

  @OneToMany(type => Compra, compra => compra.id)
  compra: Compra[];

  // @ManyToOne(type => Bairro, bairro => bairro.endereco, {
  //   eager: true,
  //   cascade: true,
  //   onDelete: 'CASCADE',
  // })
  // @JoinColumn({ name: 'idbairro' })
  // bairro: Bairro;

  @OneToMany(type => Hemocentro, hemocentro => hemocentro.id)
  hemocentro: Hemocentro[];
  
  @OneToMany(type => Pessoa_endereco, pessoa => pessoa.idendereco)
  pessoa: Pessoa_endereco[];
}
