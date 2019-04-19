import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  Double,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Hemocentro } from './hemocentro.entity';
import { Doador } from './doador.entity';

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

  @ManyToOne(type => Doador, doador => doador.doacao, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'idDoador' })
  doador: Doador;

  @OneToOne(type => Hemocentro)
  @JoinColumn()
  hemocentro: Hemocentro;
}
