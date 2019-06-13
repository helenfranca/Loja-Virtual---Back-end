import { Produto } from './produto.entity';
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
} from 'typeorm';

@Entity()
export class Imagem extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 300, nullable: false })
  url: string;

  @OneToOne(type => Produto, produto => produto.imagem)
  produto: Produto;
}
