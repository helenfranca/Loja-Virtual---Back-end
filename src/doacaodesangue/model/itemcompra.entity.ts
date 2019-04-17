import { BaseEntity, PrimaryGeneratedColumn, Column, Double, ManyToOne, Entity } from "typeorm";
import { Compra } from "./compra.entity";

@Entity()
export class ItemCompra extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({type:'int', nullable: false})
    quantidade: number;

    @Column({type:'float', nullable: false})
    valorAtual: Double;

    @ManyToOne(type => Compra, compra => compra.itemCompra)
    compra: Compra;
}