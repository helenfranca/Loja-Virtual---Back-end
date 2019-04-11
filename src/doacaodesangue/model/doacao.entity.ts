import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  Double,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Pessoa } from './pessoa.entity';

@Entity()
export class Doacao extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', nullable: false })
  datadoacao: Date;

  @Column({ type: 'integer', nullable: false })
  quantidade: number;

  @Column({ type: 'varchar', length: 50, nullable: false })
  observacao: string;

  @ManyToOne(type => Pessoa, pessoa => pessoa.doacao, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  pessoa: Pessoa;
}
