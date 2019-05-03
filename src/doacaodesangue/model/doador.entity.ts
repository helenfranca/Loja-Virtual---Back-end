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

  @Column({ type: 'boolean', nullable: false })
  malaria: boolean;

  @Column({ type: 'boolean', nullable: false })
  hepatite11: boolean;

  @Column({ type: 'boolean', nullable: false })
  hepatiteb: boolean;

  @Column({ type: 'boolean', nullable: false })
  hepatitec: boolean;

  @Column({ type: 'boolean', nullable: false })
  drogailicita: boolean;

  @Column({ type: 'boolean', nullable: false })
  doenca_chagas: boolean;

  @Column({ type: 'boolean', nullable: false })
  htlv: boolean;

  @Column({ type: 'boolean', nullable: false })
  hiv: boolean;


  @OneToMany(type => Doacao, doacao => doacao.doador)
  doacao: Doacao[];

  @OneToOne(type => TipoSanguineo)
  @JoinColumn({ name: 'idtiposanguineo' })
  tiposanguineo: TipoSanguineo;

  @OneToOne(type => Pessoa)
  @JoinColumn({ name: 'idpessoa' })
  pessoa: Pessoa;

}
