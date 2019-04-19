import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Entity,
} from 'typeorm';
import { Demanda } from './demanda.entity';
import { Doador } from './doador.entity';

@Entity()
export class TipoSanguineo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  tipofator: string;

  @OneToMany(type => Demanda, demanda => demanda.tiposanguineo)
  demanda: Demanda[];

  @OneToMany(type => Doador, doador => doador.tiposanguineo)
  doador: Doador[];
}
