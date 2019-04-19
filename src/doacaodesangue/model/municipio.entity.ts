import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Bairro } from './bairro.entity';
import { Estado } from './estado.entity';

@Entity()
export class Municipio extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 80 })
  nome: string;

  @ManyToOne(type => Estado, estado => estado.municipio, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'idestado' })
  estado: Estado;

  @OneToMany(type => Bairro, bairro => bairro.municipio)
  bairro: Bairro[];
}
