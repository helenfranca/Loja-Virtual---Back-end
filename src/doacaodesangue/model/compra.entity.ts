import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, Double, OneToMany } from "typeorm";
import { ItemCompra } from "./itemcompra.entity";

@Entity()
export class Compra extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type:'boolean', nullable: false})
    status: boolean;

    @Column({type:'timestamp', nullable: false})
    data: Date;

    @Column({ type: 'float', nullable: false })
    valorTotal: Double;

    @OneToMany(type => ItemCompra, itemCompra => itemCompra.id)
    itemCompra: ItemCompra;
}