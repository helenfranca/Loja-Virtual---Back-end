import { Injectable } from '@nestjs/common';
import { HemocentroService } from '../hemocentro.service';

@Injectable()
export class Relatorio {
  constructor(private readonly servicoHemocentro: HemocentroService) {}

  public async hemocentroDemanda() {
    return await this.servicoHemocentro.hemocentroDemanda();
  }
}
