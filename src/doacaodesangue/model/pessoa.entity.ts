import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
  ManyToMany,
  JoinTable,
  OneToOne,
} from 'typeorm';
import { Endereco } from './endereco.entity';
import { Compra } from './compra.entity';
import { Doador } from './doador.entity';

export enum SexoEnum {
  Masculino = 'M',
  Feminino = 'F',
}

@Entity()
export class Pessoa extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20, nullable: false })
  nome: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  sobrenome: string;

  @Column({ type: 'timestamp', nullable: false })
  datanascimento: Date;

  @Column({ type: 'varchar', length: 15, nullable: false, unique: true })
  cpf: string;

  @Column({ type: 'varchar', length: 1, nullable: false })
  sexo: SexoEnum;

  @Column({ type: 'varchar', length: 30, nullable: false })
  email: string;

  @Column({ type: 'bigint', nullable: false })
  telefone: number;

  @Column({ type: 'varchar', length: 250, nullable: false })
  senha: string;

  @Column({ type: 'boolean', nullable: false })
  status: boolean;

  @OneToMany(type => Compra, compra => compra.id)
  compra: Compra[];

  @ManyToMany(type => Endereco)
  @JoinTable({
    name: 'pessoa_endereco',
    joinColumn: { name: 'idpessoa', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'idendereco', referencedColumnName: 'id' },
  })
  enderecos: Endereco[];

  @OneToOne(type => Doador, doador => doador.pessoa)
  doador: Doador;
}
