import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  Double,
} from 'typeorm';

export enum TipoEnum {
  Camisa = 'Camisa',
  Bottons = 'Bottons',
  Caneca = 'Caneca',
}

export class Produto extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  nome: string;

  @Column({ type: 'int', nullable: false })
  quantidade: number;

  @Column({ type: 'varchar', length: 250, nullable: false })
  descricao: string;

  @Column('varchar')
  tipo: TipoEnum;

  @Column({ type: 'float', nullable: false })
  valor: Double;
}
