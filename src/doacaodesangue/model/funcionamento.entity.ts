import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  Timestamp,
  ManyToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Hemocentro } from './hemocentro.entity';
import { DiasSemana } from './diassemana.entity';

@Entity()
export class Funcionamento extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  horaAbertura: string;

  @Column({ type: 'varchar', nullable: false })
  horaFechamento: string;

  // @ManyToOne(type => Hemocentro, hemocentro => hemocentro.funcionamento, {
  //   cascade: true,
  //   onDelete: 'CASCADE',
  // })
  // @JoinColumn({ name: 'idhemocentro' })
  // hemocentro: Hemocentro;

  @OneToMany(type => DiasSemana, diassemana => diassemana.funcionamento)
  diassemana: DiasSemana[];
}
