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

  @ManyToOne(type => Doador, doador => doador.doacao, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'iddoador' })
  doador: Doador;

  @ManyToOne(type => Hemocentro, hemocentro => hemocentro.doacao, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'idhemocentro' })
  hemocentro: Hemocentro;
}
