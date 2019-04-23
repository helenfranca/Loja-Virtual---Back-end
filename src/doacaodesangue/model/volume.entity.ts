import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { VolumeEnum } from './Enum';
import { Produto } from './produto.entity';

@Entity()
export class Volume extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20, nullable: false })
  quantidade: VolumeEnum;

  @OneToMany(type => Produto, produto => produto.volume)
  produto: Produto[];
}
