import { PessoaService } from './service/pessoa.service';
import { databaseProviders } from './database/database.providers';
import { PessoaController } from './controller/pessoa.controller';
import { Module, CacheModule } from '@nestjs/common';
import { HemocentroService } from './service/hemocentro.service';
import { hemocentroController } from './controller/hemocentro.controller';

import { DoacaoService } from './service/doacao.service';
import { DoacaoController } from './controller/doacao.controller';

const modelProvider = [...databaseProviders];


const modelService = [PessoaService, DoacaoService, HemocentroService];

const modelController = [PessoaController, DoacaoController, hemocentroController];

@Module({
  imports: [
    CacheModule.register({
      ttl: 10,
      max: 10,
    }),
  ],
  providers: [...modelProvider, ...modelService],
  controllers: [...modelController],
})
export class DoacaodeSangueModule {}
