import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Doacao } from './doacao.entity';
import { TipoSanguineo } from './tiposanguineo.entity';
import { Pessoa } from './pessoa.entity';

@Entity()
export class Doador extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(type => Doacao, doacao => doacao.doador)
  doacao: Doacao[];

  @OneToOne(type => TipoSanguineo)
  @JoinColumn({ name: 'idtiposanguineo' })
  tiposanguineo: TipoSanguineo;

  @OneToOne(type => Pessoa)
  @JoinColumn({ name: 'idpessoa' })
  pessoa: Pessoa;
}
