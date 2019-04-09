import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  Double,
} from 'typeorm';

@Entity()
export class Pessoa extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 500 })
  nome: string;

  @Column('numeric')
  valortotal: Double;

  @Column('timestamp')
  data: Date;
}
