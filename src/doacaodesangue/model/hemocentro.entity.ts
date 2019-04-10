import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    Double,
  } from 'typeorm';

  @Entity()
  export class Hemocentro extends BaseEntity {
    @PrimaryGeneratedColumn()  
    id: number;

    @Column({type: 'varchar', length:500})
    nome: string;
    
    @Column({type:'varchar', length:14})
    cnpj: number;
    
    @Column({type:'varchar', length:100})
    email: string;
    
    @Column({type:'varchar', length:20})
    senha: string;
    
    @Column({type:'varchar', length:8})
    cep: string;
    
    @Column({type:'varchar', length:100})
    bairro: string;
    
    @Column({type:'varchar', length:100})
    cidade: string;
    
    @Column({type:'varchar', length:100})
    logradouro: string;
    
    @Column({type:'varchar', length:10})
    numeroImovel: string;
    
    @Column({type:'varchar', length:100})
    responsavel: string;

    @Column('timestamp')
    data: Date;
  }