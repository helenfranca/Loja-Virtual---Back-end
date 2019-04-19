import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { Funcionamento } from './funcionamento.entity';
import { Demanda } from './demanda.entity';
import { Doacao } from './doacao.entity';

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

  @Column({ type: 'varchar', length: 20, nullable: false })
  senha: string;

  @Column({ type: 'varchar', length: 11 })
  telefone: string;

  @OneToMany(type => Funcionamento, funcionamento => funcionamento.hemocentro)
  funcionamento: Funcionamento[];

  @OneToMany(type => Demanda, demanda => demanda.hemocentro)
  demanda: Demanda[];

  @OneToMany(type => Doacao, doacao => doacao.hemocentro)
  doacao: Doacao[];
}
