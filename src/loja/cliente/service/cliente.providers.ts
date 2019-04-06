import { Connection, Repository } from 'typeorm';
import { Cliente } from './../../core/entities/cliente.entity';

export const clienteProviders = [
  {
    provide: 'CLIENTE_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Cliente),
    inject: ['DATABASE_CONNECTION'],
  },
];
