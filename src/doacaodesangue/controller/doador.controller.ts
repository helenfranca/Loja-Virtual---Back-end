import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  HttpStatus,
  Param,
  Put,
} from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { Doador } from '../model/doador.entity';
import { Montador } from '../service/logica/montador.logica';
import { Tuntum } from '../service/logica/tuntum.logica';

@ApiUseTags('Doador')
@Controller()
export class DoadorController {
  constructor(
    private readonly montador: Montador,
    private readonly tuntum: Tuntum,
  ) {}
  @Get('/doador')
  root(): any {
    return this.montador.pegaDoadores();
  }

  @Get('/doador/aptos')
  public getAptos(): Promise<Doador[]> {
    return this.tuntum.aptosDoar();
  }

  @Get('/doador/tipo')
  public getDoadores() {
    return this.tuntum.doadorTipo();
  }

  @Get('/doador/:id')
  async readOne(@Res() res, @Param() id): Promise<any> {
    try {
      let doacao: Doador = await this.montador.leUmDoador(id.id);
      if (doacao != undefined) {
        res.status(HttpStatus.OK).send(doacao);
      } else {
        res
          .status(HttpStatus.NOT_FOUND)
          .send('Nenhum doador encontrada na busca');
      }
    } catch (err) {
      res.status(HttpStatus.BAD_GATEWAY).send(err.message);
    }
  }

  @Post('/doador')
  public createOne(@Body() body: any): Promise<Doador> {
    return this.montador.montaDoador(body);
  }

  @Put('/doador')
  public updateOne(@Body() body: any) {
    return this.montador.alteraDoador(body);
  }
}
