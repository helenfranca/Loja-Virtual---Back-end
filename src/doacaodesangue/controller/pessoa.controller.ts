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
  Query,
} from '@nestjs/common';
import { Pessoa } from '../model/pessoa.entity';
import { ApiUseTags } from '@nestjs/swagger';
import { Montador } from '../service/logica/montador.logica';
import { Endereco } from '../model/endereco.entity';
import { async } from 'rxjs/internal/scheduler/async';
import { Doador } from '../model/doador.entity';

@ApiUseTags('Pessoa')
@Controller()
export class PessoaController {
  constructor(private readonly montador: Montador) {}
  @Get('/pessoa')
  root(): any {
    return this.montador.pegaPessoas();
  }

  @Get('/pessoa/:cpf')
  async buscaCPF(@Res() res, @Param() cpf) {
    try {
      let pessoa: Pessoa = await this.montador.leporCpf(cpf.cpf);
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

  @Get('/pessoa/doador/:cpf')
  async buscaDoadorPorCPF(@Res() res, @Param() cpf){
    try {
      let doador: Doador = await this.montador.consultaDoadorPorCpf(cpf.cpf);
      if (doador != undefined) {
        res.status(HttpStatus.OK).send(doador);
      } else {
        res
          .status(HttpStatus.NOT_FOUND)
          .send('Nenhum doador encontrado na busca');
      }
    } catch (err) {
      res.status(HttpStatus.BAD_GATEWAY).send(err.message);
    }
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

  @Post('/pessoa/endereco')
  public async createEndereco(@Body() body: any): Promise<Pessoa> {
    let pessoa: Pessoa = await this.montador.leUmaPessoa(body.id);
    let enderecoNovo: Endereco = await this.montador.montaEndereco(body);
    return this.montador.pessoa_endereco(pessoa, enderecoNovo);
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
