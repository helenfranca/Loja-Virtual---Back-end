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
import { Montador } from '../service/logica/montador.logica';

@ApiUseTags('Doacao')
@Controller()
export class DoacaoController {
  constructor(private readonly montador: Montador) {}
  @Get('/doacao')
  root(): any {
    return this.montador.pegaDoacoes();
  }

  @Get('/doacao/:id')
  async readOne(@Res() res, @Param() id) {
    try {
      let doacao: Doacao = await this.montador.leUmaDoacao(id.id);
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

  @Get('doacao/doador/:id')
  async DoacaodoDoador(@Res() res, @Param() id) {
    try {
      let doacoes = await this.montador.pegaDoacoesDoador(id.id);
      console.log(doacoes);
      if (doacoes != undefined) {
        res.status(HttpStatus.OK).send(doacoes);
      } else {
        res
          .status(HttpStatus.NOT_FOUND)
          .send(
            'Nenhuma doação referente a esse doador foi encontrada na busca',
          );
      }
    } catch (err) {
      res.status(HttpStatus.BAD_GATEWAY).send(err.message);
    }
  }

  @Get('/doacao/pessoa/:cpf')
  async buscarDoacoesPorCPF(@Res() res, @Param() param){
    try {
      let doacoes: Doacao[] = await this.montador.consultaDoacoesPorCpf(param.cpf);
      if (doacoes != undefined) {
        res.status(HttpStatus.OK).send(doacoes);
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
    return this.montador.montaDoacao(body);
  }

  @Put('/doacao')
  public updateOne(@Body() body: any) {
    return this.montador.alteraDoacao(body);
  }
}
