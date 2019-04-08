import { Connection, Repository } from 'typeorm';
import { Cliente } from './../../core/entities/cliente.entity';
export declare const clienteProviders: {
    provide: string;
    useFactory: (connection: Connection) => Repository<Cliente>;
    inject: string[];
}[];
