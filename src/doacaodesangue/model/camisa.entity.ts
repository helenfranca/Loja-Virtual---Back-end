import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { Produto } from './produto.entity';
import { ItemCompra } from './itemcompra.entity';

@Entity()
export class Camisa extends Produto {
  @Column({ type: 'varchar', length: 100, nullable: false })
  material: string;

  @Column({ type: 'int', nullable: false })
  tamanho: number;

  @Column({ type: 'varchar', nullable: false })
  genero: string;

  @ManyToOne(type => ItemCompra, itemCompra => itemCompra.camisa, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'iditemcompra' })
  itemCompra: ItemCompra;
}
