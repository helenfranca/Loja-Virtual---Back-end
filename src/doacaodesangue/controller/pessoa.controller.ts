import {
  Controller,
  Get,
  Res,
  Param,
  HttpStatus,
  Body,
  Post,
  Put,
  Delete,
} from '@nestjs/common';

import { Pessoa } from '../model/pessoa.entity';
import { ApiUseTags } from '@nestjs/swagger';
import { Montador } from '../service/logica/montador.logica';

@ApiUseTags('Pessoa')
@Controller()
export class PessoaController {
  constructor(private readonly montador: Montador) {}
  @Get('/pessoa')
  root(): any {
    return this.montador.pegaPessoas();
  }

  @Get('/pessoa/:id')
  async readOne(@Res() res, @Param() id) {
    try {
      let pessoa: Pessoa = await this.montador.leUmaPessoa(id.id);
      if (pessoa != undefined) {
        res.status(HttpStatus.OK).send(pessoa);
      } else {
        res
          .status(HttpStatus.NOT_FOUND)

          .send('Nenhum usuário encontrado na busca');
      }
    } catch (err) {
      res.status(HttpStatus.BAD_GATEWAY).send(err.message);
    }
  }

  @Post('/pessoa')
  public createOne(@Body() body: Pessoa): Promise<Pessoa> {
    return this.montador.montaPessoa(body);
  }

  @Put('/pessoa')
  public updateOne(@Body() body: Pessoa) {
    return this.montador.alteraPessoa(body);
  }

  @Delete('/pessoa')
  public deleteOne(@Body() body: Pessoa) {
    return this.montador.deletaPessoa(body);
  }
}
