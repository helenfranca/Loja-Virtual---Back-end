import {
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  Double,
  Entity,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { ItemCompra } from './itemcompra.entity';
import { Categoria } from './categoria.entity';
import { Volume } from './volume.entity';
import { Tamanho } from './tamanho.entity';
import { Genero } from './genero.entity';
import { Material } from './material.entity';

@Entity()
export class Produto extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  nome: string;

  @Column({ type: 'varchar', length: 250, nullable: false })
  descricao: string;

  @Column({ type: 'int', nullable: false })
  quantidade: number;

  @Column({ type: 'float', nullable: false })
  valorunitario: Double;

  @OneToMany(() => ItemCompra, itemcompra => itemcompra.produto)
  itemcompra: ItemCompra;

  @ManyToOne(() => Categoria)
  @JoinColumn({ name: 'idcategoria' })
  categoria: Categoria;

  @ManyToOne(() => Volume)
  @JoinColumn({ name: 'idvolume' })
  volume: Volume;

  @ManyToOne(() => Tamanho)
  @JoinColumn({ name: 'idtamanho' })
  tamanho: Tamanho;

  @ManyToOne(() => Genero)
  @JoinColumn({ name: 'idgenero' })
  genero: Genero;

  @ManyToOne(() => Material)
  @JoinColumn({ name: 'idmaterial' })
  material: Material;
}
