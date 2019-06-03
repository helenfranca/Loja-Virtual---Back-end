import { Injectable } from '@nestjs/common';
import { HemocentroService } from '../hemocentro.service';
import { DemandaService } from '../demanda.service';

@Injectable()
export class Relatorio {
  constructor(
    private readonly servicoHemocentro: HemocentroService,
    private readonly servicoDemanda: DemandaService,
  ) {}

  public async hemocentroDemanda() {
    return await this.servicoHemocentro.hemocentroDemanda();
  }

  public async demandaTipo() {
    return await this.servicoDemanda.demandaTipo();
  }
}
