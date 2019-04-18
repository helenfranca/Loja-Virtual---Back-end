import {
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  Double,
  ManyToOne,
} from 'typeorm';
import { ItemCompra } from './itemcompra.entity';

export enum TipoEnum {
  Camisa = 'Camisa',
  Bottons = 'Botton',
  Caneca = 'Caneca',
}

export class Produto extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  nome: string;

  @Column({ type: 'varchar', length: 250, nullable: false })
  descricao: string;

  @Column({ type: 'int', nullable: false })
  quantidade: number;

  @Column('varchar')
  tipo: TipoEnum;

  @Column({ type: 'float', nullable: false })
  valor: Double;
}
