import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Double,
  ManyToOne,
  Entity,
  OneToMany,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Caneca } from './caneca.entity';
import { Botton } from './botton.entity';
import { Camisa } from './camisa.entity';

@Entity()
export class ItemCompra extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: false })
  quantidade: number;

  @Column({ type: 'float', nullable: false })
  valorAtual: Double;

  @OneToMany(type => Caneca, caneca => caneca.id)
  caneca: Caneca;

  @OneToMany(type => Botton, botton => botton.id)
  botton: Botton;

  @OneToMany(type => Camisa, camisa => camisa.id)
  camisa: Camisa;
}
