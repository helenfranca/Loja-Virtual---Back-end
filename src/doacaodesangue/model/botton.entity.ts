import { Column, Entity } from 'typeorm';
import { Produto } from './produto.entity';

@Entity()
export class Botton extends Produto {
  @Column({ type: 'int', nullable: false })
  tamanho: number;
}
