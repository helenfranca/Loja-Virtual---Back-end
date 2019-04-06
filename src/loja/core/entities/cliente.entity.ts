import { Entity, Column, PrimaryGeneratedColumn, Double } from 'typeorm';

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 500 })
  nome: string;

  @Column('numeric')
  valortotal: Double;

  @Column('timestamp')
  data: Date;
}
