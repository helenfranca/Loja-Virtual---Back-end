import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Funcionamento } from './funcionamento.entity';

export enum DiaSemanaEnum {
  Domingo = 0,
  Segunda = 1,
  Terca = 2,
  Quarta = 3,
  Quinta = 4,
  Sexta = 5,
  Sabado = 6,
}

@Entity()
export class DiasSemana extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: false })
  diaSemana: DiaSemanaEnum;

  @ManyToOne(type => Funcionamento, funcionamento => funcionamento.diassemana, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'idfuncionamento' })
  funcionamento: Funcionamento;
}
