import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  Column,
  OneToMany,
} from 'typeorm';
import { MaterialEnum } from './Enum';
import { Produto } from './produto.entity';

@Entity()
export class Material extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20, nullable: false })
  material: MaterialEnum;

  @OneToMany(type => Produto, produto => produto.material)
  produto: Produto[];
}
