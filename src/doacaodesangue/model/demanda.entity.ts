import {
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  Entity,
} from 'typeorm';
import { TipoSanguineo } from './tiposanguineo.entity';
import { Hemocentro } from './hemocentro.entity';

export enum StatusEnum {
  Aberta = 0,
  Fechada = 1,
}

@Entity()
export class Demanda extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', nullable: false })
  data: Date;

  @Column({ type: 'int', nullable: false })
  status: StatusEnum;

  @OneToOne(type => TipoSanguineo, tiposanguineo => tiposanguineo.id)
  tiposanguineo: TipoSanguineo;

  @OneToOne(type => Hemocentro)
  @JoinColumn()
  hemocentro: Hemocentro;
}
