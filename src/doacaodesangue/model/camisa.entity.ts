import { Column, Entity } from 'typeorm';
import { Produto } from './produto.entity';

@Entity()
export class Camisa extends Produto {
  @Column({ type: 'varchar', length: 100, nullable: false })
  material: string;

  @Column({ type: 'int', nullable: false })
  tamanho: number;

  @Column({ type: 'varchar', nullable: false })
  genero: string;
}
