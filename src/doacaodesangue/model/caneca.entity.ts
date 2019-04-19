import { Column, Entity, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Produto } from './produto.entity';
import { ItemCompra } from './itemcompra.entity';

@Entity()
export class Caneca extends Produto {
  @Column({ type: 'varchar', length: 100, nullable: false })
  material: string;

  @Column({ type: 'int', nullable: false })
  volume: number;

  @OneToOne(type => ItemCompra)
  @JoinColumn()
  itemcompra: ItemCompra;
}
