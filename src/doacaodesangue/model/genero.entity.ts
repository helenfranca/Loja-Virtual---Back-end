import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { GeneroEnum } from './Enum';
import { Produto } from './produto.entity';

@Entity()
export class Genero extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20, nullable: false })
  genero: GeneroEnum;

  @OneToMany(type => Produto, produto => produto.genero)
  produto: Produto[];
}
