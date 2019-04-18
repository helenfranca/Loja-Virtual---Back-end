import { Column, Entity, ManyToOne } from 'typeorm';
import { Produto } from './produto.entity';
import { ItemCompra } from './itemcompra.entity';

@Entity()
export class Caneca extends Produto {
  @Column({ type: 'varchar', length: 100, nullable: false })
  material: string;

  @Column({ type: 'int', nullable: false })
  volume: number;

  @ManyToOne(type => ItemCompra, itemCompra => itemCompra.caneca)
  itemCompra: ItemCompra;
}
