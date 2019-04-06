import { Module } from '@nestjs/common';
import { DatabaseModule } from '../core/database/database.module';
import { clienteProviders } from './service/cliente.providers';
import { ClienteService } from './service/cliente.service';

@Module({
  imports: [DatabaseModule],
  providers: [...clienteProviders, ClienteService],
})
export class ClienteModule {}
