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

@ApiUseTags('produto')
@Controller()
export class ProdutoController {
  constructor(private readonly ProdutoService: ProdutoService) {}
  @Get('/produto')
  root(): Promise<Produto[]> {
    return this.ProdutoService.readAll();
  }

  @Get('/produto/busca')
  async buscaProduto(@Res() res, @Query() texto) {
    try {
      let Produto: Produto = await this.ProdutoService.buscaProdutoParam(
        texto.nome,
      );
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
      let Produto: Produto = await this.ProdutoService.readOne(id.id);

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
    return this.ProdutoService.Create(body);
  }

  @Get('/camisas')
  async buscaCamisas() {
    return await this.ProdutoService.buscaCamisas();
  }

  @Get('/bottons')
  async buscaBottons() {
    return await this.ProdutoService.buscaBottons();
  }

  @Get('/canecas')
  async buscaCanecas() {
    return await this.ProdutoService.buscaCanecas();
  }
}
