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
import { DoadorService } from './service/doador.service';
import { DoadorController } from './controller/doador.controller';
import { ObservacaoService } from './service/observacao.service';
import { DemandaService } from './service/demanda.service';
import { DemandaController } from './controller/demanda.controller';
import { TipoSanguineoService } from './service/tiposanguineo.service';
import { CriptografiaService } from './service/logica/criptografia.logica';
import { ConvocacaoLogica } from './service/logica/convocacao.logica';
import { Montador } from './service/logica/montador.logica';
import { Relatorio } from './service/logica/relatorio.logica';
import { Tuntum } from './service/logica/tuntum.logica';
import { MontaEmail } from './service/logica/email';

const modelProvider = [...databaseProviders];

const modelService = [
  PessoaService,
  DoacaoService,
  HemocentroService,
  ProdutoService,
  DoadorService,
  ObservacaoService,
  DemandaService,
  TipoSanguineoService,
  CriptografiaService,
  ConvocacaoLogica,
  Montador,
  Relatorio,
  Tuntum,
  MontaEmail,
];

const modelController = [
  PessoaController,
  DoacaoController,
  HemocentroController,
  ProdutoController,
  DoadorController,
  DemandaController,
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
