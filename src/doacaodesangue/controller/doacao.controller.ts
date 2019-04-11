import {
  Controller,
  Get,
  Res,
  Param,
  HttpStatus,
  Body,
  Post,
  Put,
} from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { DoacaoService } from '../service/doacao.service';
import { Doacao } from '../model/doacao.entity';

@ApiUseTags('Doacao')
@Controller()
export class DoacaoController {
  constructor(private readonly doacaoService: DoacaoService) {}
  @Get('/doacao')
  root(): any {
    return this.doacaoService.readAll();
  }

  @Get('/doacao/:id')
  async readOne(@Res() res, @Param() id) {
    try {
      let doacao: Doacao = await this.doacaoService.readOne(id.id);
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

  @Post('/doacao')
  public createOne(@Body() body: any): Promise<Doacao> {
    return this.doacaoService.Create(body);
  }

  @Put('/doacao')
  public updateOne(@Body() body: any) {
    return this.doacaoService.Update(body);
  }
}
