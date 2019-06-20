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
  OneToOne,
} from 'typeorm';
import { Hemocentro } from './hemocentro.entity';
import { DiasSemana } from './diassemana.entity';

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
export class Funcionamento extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  horaAbertura: string;

  @Column({ type: 'varchar', nullable: false })
  horaFechamento: string;

  @ManyToOne(type => Hemocentro, hemocentro => hemocentro.funcionamento, {
    cascade: true,
    onDelete: 'CASCADE',
   })
   @JoinColumn({ name: 'idhemocentro' })
   hemocentro: Hemocentro;

   @Column({ type: 'int', nullable: false })
   diaFuncionamento: DiaSemanaEnum;
}
