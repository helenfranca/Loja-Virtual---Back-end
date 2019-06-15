import {
  Controller,
  Get,
  Param,
  Res,
  HttpStatus,
  Post,
  Body,
} from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { Montador } from '../service/logica/montador.logica';
import { Endereco } from '../model/endereco.entity';

@ApiUseTags('Endereço')
@Controller()
export class EnderecoController {
  constructor(private readonly montador: Montador) {}

  @Get('/endereco')
  root(): any {
    return this.montador.pegaEnderecos();
  }

  @Get('/endereco/:cep')
  async readOne(@Res() res, @Param() cep) {
    try {
      let endereco: Endereco = await this.montador.pegaCep(cep.cep);
      if (endereco != undefined) {
        res.status(HttpStatus.OK).send(endereco);
      } else {
        res
          .status(HttpStatus.NOT_FOUND)

          .send('Nenhum Endereço encontrado na busca');
      }
    } catch (err) {
      res.status(HttpStatus.BAD_GATEWAY).send(err.message);
    }
  }

  @Get('/endereco/:cep/:numero')
  async readOneCEPNum(@Res() res, @Param() cep, @Param() numero) {
    try {
      let endereco: Endereco = await this.montador.pegaCepNum(
        cep.cep,
        numero.numero,
      );
      if (endereco != undefined) {
        res.status(HttpStatus.OK).send(endereco);
      } else {
        res
          .status(HttpStatus.NOT_FOUND)

          .send('Nenhum Endereço encontrado na busca');
      }
    } catch (err) {
      res.status(HttpStatus.BAD_GATEWAY).send(err.message);
    }
  }

  @Post('/endereco')
  public createOne(@Body() body: any): Promise<Endereco> {
    return this.montador.montaEndereco(body);
  }
}
