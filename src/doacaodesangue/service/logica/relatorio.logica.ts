import { Injectable } from '@nestjs/common';
import { HemocentroService } from '../hemocentro.service';
import { DemandaService } from '../demanda.service';
import { ProdutoService } from '../produto.service';

@Injectable()
export class Relatorio {
  constructor(
    private readonly servicoHemocentro: HemocentroService,
    private readonly servicoDemanda: DemandaService,
    private readonly servicoProduto: ProdutoService,
  ) {}

  public async hemocentroDemanda() {
    return await this.servicoHemocentro.hemocentroDemanda();
  }

  public async demandaTipo() {
    return await this.servicoDemanda.demandaTipo();
  }

  public async top3Produtos() {
    return await this.servicoProduto.buscaTop3Produtos();
  }
}
