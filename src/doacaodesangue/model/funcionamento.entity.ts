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
  Domingo = "Domingo",
  Segunda = "Segunda",
  Terca = "Terca",
  Quarta = "Quarta",
  Quinta = "Quinta",
  Sexta = "Sexta",
  Sabado = "Sabado"
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

   @Column({ type: 'varchar', nullable: false })
   diaFuncionamento: DiaSemanaEnum;
}
