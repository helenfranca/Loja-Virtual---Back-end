import {
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
  OneToOne,
  JoinColumn,
  ManyToOne,
  Entity,
} from 'typeorm';
import { Compra } from './compra.entity';
import { Endereco } from './endereco.entity';
import { Municipio } from './municipio.entity';

@Entity()
export class Bairro extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20, nullable: false })
  nome: string;

  @ManyToOne(type => Municipio, municipio => municipio.bairro, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'idmunicipio' })
  municipio: Municipio;

  @OneToMany(type => Endereco, endereco => endereco.bairro)
  endereco: Endereco[];
}
