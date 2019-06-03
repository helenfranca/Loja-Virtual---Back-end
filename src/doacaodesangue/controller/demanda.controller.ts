import { ApiUseTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Res,
  Param,
  HttpStatus,
  Post,
  Body,
  Put,
} from '@nestjs/common';
import { Demanda } from '../model/demanda.entity';
import { Montador } from '../service/logica/montador.logica';
import { Relatorio } from '../service/logica/relatorio.logica';

@ApiUseTags('Demanda')
@Controller()
export class DemandaController {
  constructor(
    private readonly montador: Montador,
    private readonly relatorio: Relatorio,
  ) {}

  @Get('/demanda')
  root(): any {
    return this.montador.pegaDemanda();
  }

  @Get('/demandas/tipo')
  async relatorioDemanda(@Res() res) {
    try {
      let demanda = await this.relatorio.demandaTipo();

      if (demanda != undefined) {
        res.status(HttpStatus.OK).send(demanda);
      } else {
        res
          .status(HttpStatus.NOT_FOUND)
          .send('Nenhuma demanda encontrada na busca');
      }
    } catch (err) {
      res.status(HttpStatus.BAD_GATEWAY).send(err.message);
    }
  }

  @Get('/demanda/:id')
  async readOne(@Res() res, @Param() id) {
    try {
      let demanda: Demanda = await this.montador.leUmaDemanda(id.id);
      if (demanda != undefined) {
        res.status(HttpStatus.OK).send(demanda);
      } else {
        res
          .status(HttpStatus.NOT_FOUND)
          .send('Nenhuma demanda encontrada na busca');
      }
    } catch (err) {
      res.status(HttpStatus.BAD_GATEWAY).send(err.message);
    }
  }

  @Post('/demanda')
  public createOne(@Body() body: any): Promise<Demanda> {
    return this.montador.montaDemanda(body);
  }

  @Put('/demanda')
  public updateOne(@Body() body: any) {
    return this.montador.deletarDemanda(body);
  }
}
