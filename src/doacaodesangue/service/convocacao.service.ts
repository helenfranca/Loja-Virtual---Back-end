import { Injectable } from '@nestjs/common';
import { DoadorService } from './doador.service';
import { Doador } from '../model/doador.entity';

const CronJob = require('cron').CronJob;
const d = new DoadorService();

@Injectable()
export class ConvocacaoService {
  // job = new CronJob(
  //   '0 * * * * *',
  //   async () => {
  //     let a: Doador[] = await d.aptos();
  //     console.log(a);
  //   },
  //   null,
  //   true,
  //   'America/Sao_Paulo',
  // );

  notificar(doadores) {}
}
