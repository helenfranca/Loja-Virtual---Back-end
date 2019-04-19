import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { Produto } from './produto.entity';
import { ItemCompra } from './itemcompra.entity';

@Entity()
export class Botton extends Produto {
  @Column({ type: 'int', nullable: false })
  tamanho: number;

  @ManyToOne(type => ItemCompra, itemCompra => itemCompra.botton, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'iditemcompra' })
  itemCompra: ItemCompra;
}
