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
import { DoadorService } from '../service/doador.service';
import { Doador } from '../model/doador.entity';

@ApiUseTags('Doador')
@Controller()
export class DoadorController {
  constructor(private readonly doadorService: DoadorService) {}
  @Get('/doador')
  root(): any {
    return this.doadorService.readAll();
  }

  @Get('/doador/:id')
  async readOne(@Res() res, @Param() id) {
    try {
      let doacao: Doador = await this.doadorService.readOne(id.id);
      if (doacao != undefined) {
        res.status(HttpStatus.OK).send(doacao);
      } else {
        res
          .status(HttpStatus.NOT_FOUND)
          .send('Nenhuma doação encontrada na busca');
      }
    } catch (err) {
      res.status(HttpStatus.BAD_GATEWAY).send(err.message);
    }
  }

  @Post('/doador')
  public createOne(@Body() body: any): Promise<Doador> {
    return this.doadorService.Create(body);
  }

  @Put('/doador')
  public updateOne(@Body() body: any) {
    return this.doadorService.Update(body);
  }
}
