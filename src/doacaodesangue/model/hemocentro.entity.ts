import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Funcionamento } from './funcionamento.entity';
import { Demanda } from './demanda.entity';
import { Doacao } from './doacao.entity';
import { Endereco } from './endereco.entity';

@Entity()
export class Hemocentro extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 500, nullable: false })
  nome: string;

  @Column({ type: 'varchar', length: 7, nullable: false })
  cnes: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 250, nullable: false })
  senha: string;

  @Column({ type: 'varchar', length: 11 })
  telefone: string;

  @Column({ type: 'boolean', nullable: false })
  status: boolean;

  // @OneToMany(type => Funcionamento, funcionamento => funcionamento.hemocentro)
  // funcionamento: Funcionamento[];

  @ManyToMany(type => Funcionamento, { eager: true })
  @JoinTable({
    name: 'hemocentro_funcionamento',
    joinColumn: { name: 'idhemocentro', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'idfuncionamento', referencedColumnName: 'id' },
  })
  funcionamento: Funcionamento[];

  @OneToMany(type => Demanda, demanda => demanda.hemocentro)
  demanda: Demanda[];

  @OneToMany(type => Doacao, doacao => doacao.hemocentro)
  doacao: Doacao[];

  @OneToOne(type => Endereco, endereco => endereco.hemocentro, {
    eager: true,
    cascade: true,
  })
  @JoinColumn({ name: 'idendereco' })
  endereco: Endereco;
}
