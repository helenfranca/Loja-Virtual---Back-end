import { PessoaService } from './service/pessoa.service';
import { databaseProviders } from './database/database.providers';
import { PessoaController } from './controller/pessoa.controller';
import { Module, CacheModule } from '@nestjs/common';
import { HemocentroService } from './service/hemocentro.service';
import { HemocentroController } from './controller/hemocentro.controller';
import { DoacaoService } from './service/doacao.service';
import { DoacaoController } from './controller/doacao.controller';
import { ProdutoService } from './service/produto.service';
import { ProdutoController } from './controller/produto.controller';

const modelProvider = [...databaseProviders];

const modelService = [
  PessoaService,
  DoacaoService,
  HemocentroService,
  ProdutoService,
];

const modelController = [
  PessoaController,
  DoacaoController,
  HemocentroController,
  ProdutoController,
];

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
