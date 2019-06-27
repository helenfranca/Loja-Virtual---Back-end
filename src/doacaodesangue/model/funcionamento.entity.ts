import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Hemocentro } from './hemocentro.entity';

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

  @ManyToOne(() => Hemocentro, hemocentro => hemocentro.funcionamento, {
    cascade: true,
    onDelete: 'CASCADE',
   })
   @JoinColumn({ name: 'idhemocentro' })
   hemocentro: Hemocentro;

   @Column({ type: 'int', nullable: false })
   diaFuncionamento: DiaSemanaEnum;
}
