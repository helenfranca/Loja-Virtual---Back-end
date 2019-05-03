import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { Doacao } from './doacao.entity';
import { TipoSanguineo } from './tiposanguineo.entity';
import { Pessoa } from './pessoa.entity';

@Entity()
export class Doador extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'boolean', nullable: false })
  apto: boolean;

  transfusao: boolean;

  malaria: boolean;
  hepatite11: boolean;
  drogailicita: boolean;

  @OneToMany(type => Doacao, doacao => doacao.doador)
  doacao: Doacao[];

  @OneToOne(type => TipoSanguineo)
  @JoinColumn({ name: 'idtiposanguineo' })
  tiposanguineo: TipoSanguineo;

  @OneToOne(type => Pessoa)
  @JoinColumn({ name: 'idpessoa' })
  pessoa: Pessoa;

}
