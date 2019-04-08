import { Repository } from 'typeorm';
import { Cliente } from './../../core/entities/cliente.entity';
export declare class ClienteService {
    private readonly clienteRepository;
    constructor(clienteRepository: Repository<Cliente>);
    findAll(): Promise<Cliente[]>;
}
