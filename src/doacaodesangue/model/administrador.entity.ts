import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { Pessoa } from './pessoa.entity';

@Entity()
export class Administrador extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30, nullable: false })
  matricula: string;

  @OneToOne(type => Pessoa)
  @JoinColumn()
  pessoa: Pessoa;
}
