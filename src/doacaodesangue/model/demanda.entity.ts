import {
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  Entity,
  ManyToOne,
} from 'typeorm';
import { TipoSanguineo } from './tiposanguineo.entity';
import { Hemocentro } from './hemocentro.entity';

export enum StatusEnum {
  Aberta = 1,
  Fechada = 0,
}

@Entity()
export class Demanda extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  data: string;

  @Column({ type: 'int', nullable: false })
  status: StatusEnum;


  @ManyToOne(type => TipoSanguineo, tiposanguineo => tiposanguineo.demanda, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'idtiposanguineo' })
  tiposanguineo: TipoSanguineo;

  @ManyToOne(type => Hemocentro, hemocentro => hemocentro.demanda, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'idhemocentro' })
  hemocentro: Hemocentro;
}
