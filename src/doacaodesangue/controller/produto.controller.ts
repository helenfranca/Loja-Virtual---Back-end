import {
  Controller,
  Get,
  Res,
  Param,
  HttpStatus,
  Body,
  Post,
  Query,
} from '@nestjs/common';
import { ProdutoService } from '../service/produto.service';
import { Produto } from '../model/produto.entity';
import { ApiUseTags } from '@nestjs/swagger';
import { Montador } from '../service/logica/montador.logica';

@ApiUseTags('produto')
@Controller()
export class ProdutoController {
  constructor(private readonly montador: Montador) {}
  @Get('/produto')
  root(): Promise<Produto[]> {
    return this.montador.pegaProdutos();
  }

  @Get('/produto/busca')
  async buscaProduto(@Res() res, @Query() texto) {
    try {
      let Produto: Produto = await this.montador.buscaParametro(texto.nome);
      if (Produto != undefined) {
        res.status(HttpStatus.OK).send(Produto);
      } else {
        res
          .status(HttpStatus.NOT_FOUND)
          .send('Nenhum produto encontrado na busca');
      }
    } catch (err) {
      res.status(HttpStatus.BAD_GATEWAY).send(err.message);
    }
  }

  @Get('/produto/:id')
  async readOne(@Res() res, @Param() id) {
    try {
      let Produto: Produto = await this.montador.leUmProduto(id.id);

      if (Produto != undefined) {
        res.status(HttpStatus.OK).send(Produto);
      } else {
        res
          .status(HttpStatus.NOT_FOUND)
          .send('Nenhum produto encontrado na busca');
      }
    } catch (err) {
      res.status(HttpStatus.BAD_GATEWAY).send(err.message);
    }
  }

  @Post('/produto')
  public createOne(@Body() body: any) {
    return this.montador.montaProduto(body);
  }

  @Get('/camisas')
  async buscaCamisas() {
    return await this.montador.camisas();
  }

  @Get('/bottons')
  async buscaBottons() {
    return await this.montador.bottons();
  }

  @Get('/canecas')
  async buscaCanecas() {
    return await this.montador.canecas();
  }
}
