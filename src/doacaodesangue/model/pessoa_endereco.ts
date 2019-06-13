import { Column, BaseEntity, Entity } from 'typeorm';

@Entity()
export class Pessoa_endereco extends BaseEntity {
  @Column({ type: 'int' })
  idpessoa: number;

  @Column({ type: 'int' })
  idendereco: number;

  @Column({ type: 'int', nullable: false })
  numero: number;
}
