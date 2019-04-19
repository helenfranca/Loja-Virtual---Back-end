import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  Timestamp,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Hemocentro } from './hemocentro.entity';
import { DiasSemana } from './diassemana.entity';

@Entity()
export class Funcionamento extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', nullable: false })
  horaAbertura: Timestamp;

  @Column({ type: 'timestamp', nullable: false })
  horaFechamento: Timestamp;

  @ManyToOne(type => Hemocentro, hemocentro => hemocentro.funcionamento, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'idhemocentro' })
  hemocentro: Hemocentro;

  @OneToMany(type => DiasSemana, diassemana => diassemana.funcionamento)
  diassemana: DiasSemana[];
}
