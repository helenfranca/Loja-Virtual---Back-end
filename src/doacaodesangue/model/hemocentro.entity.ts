import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { FuncionamentoHemocentro } from './funcionamentoHemocentro.entity';

@Entity()
export class Hemocentro extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 500, nullable: false })
  nome: string;

  @Column({ type: 'varchar', length: 7, nullable: false })
  cnes: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  senha: string;

  @Column({ type: 'varchar', length: 11 })
  telefone: string;
  @OneToMany(
    () => FuncionamentoHemocentro,
    funcionamento => funcionamento.hemocentro,
  )
  funcionamento: FuncionamentoHemocentro[];
}
