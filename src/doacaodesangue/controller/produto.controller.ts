import {
  Controller,
  Get,
  Res,
  Param,
  HttpStatus,
  Body,
  Post,
} from '@nestjs/common';
import { ProdutoService } from '../service/produto.service';
import { Produto } from '../model/produto.entity';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('produto')
@Controller()
export class ProdutoController {
  constructor(private readonly ProdutoService: ProdutoService) {}
  @Get('/produto')
  root(): any {
    return this.ProdutoService.readAll();
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
          .send('Nenhum atendente encontrado na busca');
      }
    } catch (err) {
      res.status(HttpStatus.BAD_GATEWAY).send(err.message);
    }
  }

  @Post('/produto')
  public createOne(@Body() body: any) {
    return this.ProdutoService.Create(body);
  }

  @Get('/produto/busca/:texto')
  async buscaProduto(@Res() res, @Param() texto) {
    try {
      let Produto: Produto = await this.ProdutoService.buscaProdutoParam(
        texto.texto,
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

  @Get('/camisas')
  async buscaCamisas() {
    return await this.ProdutoService.buscaCamisas();
  }

<<<<<<< HEAD
  @Get('/botons')
  async buscaBotons() {
    return await this.ProdutoService.buscaBotons();
=======
  @Get('/bottons')
  async buscaBottons() {
    return await this.ProdutoService.buscaBottons();
>>>>>>> 0a4b616982d610dc468f0a37d953ec47d71de9a4
  }

  @Get('/canecas')
  async buscaCanecas() {
    return await this.ProdutoService.buscaCanecas();
  }
}
