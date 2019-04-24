import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { TamanhoEnum } from './Enum';
import { Produto } from './produto.entity';

@Entity()
export class Tamanho extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20, nullable: false })
  tamanho: TamanhoEnum;

  @OneToMany(type => Produto, produto => produto.tamanho)
  produto: Produto[];
}
