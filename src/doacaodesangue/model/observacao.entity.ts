import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Entity,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Doacao } from './doacao.entity';

@Entity()
export class Observacao extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  descricao: string;

  @OneToOne(type => Doacao)
  @JoinColumn({ name: 'iddoacao' })
  doacao: Doacao;
}
