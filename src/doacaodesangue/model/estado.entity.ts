import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Municipio } from './municipio.entity';

@Entity()
export class Estado extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30 })
  nome: string;

  @OneToMany(type => Municipio, municipio => municipio.estado)
  municipio: Municipio[];
}
