import {
Entity,
Column,
PrimaryGeneratedColumn,
BaseEntity,
Timestamp,
ManyToOne,
} from 'typeorm';
import { Hemocentro } from './hemocentro.entity';

export enum DiaSemanaEnum {
    Domingo = 0, Segunda = 1,
    Terca = 2, Quarta = 3,
    Quinta = 4, Sexta = 5,
    Sabado = 6}

@Entity()
export class FuncionamentoHemocentro extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'smallint', nullable:false})
    diaSemana: DiaSemanaEnum;

    @Column({type: 'timestamp', nullable: false})
    horaAbertura: Timestamp;
    
    @Column({type: 'timestamp', nullable: false})
    horaFechamento: Timestamp;

    @ManyToOne(() => Hemocentro, hemocentro => hemocentro.funcionamento)
    hemocentro: Hemocentro;

}