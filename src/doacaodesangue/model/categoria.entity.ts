import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Entity,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { CategoriaEnum } from './Enum';
import { Produto } from './produto.entity';

@Entity()
export class Categoria extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 10, nullable: false })
  nome: CategoriaEnum;

  @OneToMany(type => Produto, produto => produto.categoria)
  produto: Produto[];
}
