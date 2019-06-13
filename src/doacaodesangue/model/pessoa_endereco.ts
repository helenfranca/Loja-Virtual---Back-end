import {
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  Entity,
} from 'typeorm';


@Entity()
export class Pessoa_endereco extends BaseEntity {
    

  @Column({ type: 'int'})
  idpessoa: int;
  
  @Column({ type: 'int'})
  idendereco: int;
  
  @Column({ type: 'int', nullable: false })
  numero: number;
    
}