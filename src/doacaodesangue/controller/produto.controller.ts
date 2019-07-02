import {
  Controller,
  Get,
  Res,
  Param,
  HttpStatus,
  Body,
  Post,
  Query,
  Put,
} from '@nestjs/common';
import { Produto } from '../model/produto.entity';
import { ApiUseTags } from '@nestjs/swagger';
import { Montador } from '../service/logica/montador.logica';
import { Relatorio } from '../service/logica/relatorio.logica';

@ApiUseTags('produto')
@Controller()
export class ProdutoController {
  constructor(
    private readonly montador: Montador,
    private readonly relatorio: Relatorio,
  ) {}
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

  @Put('/produto')
  public deleteOne(@Body() body: Produto) {
    return this.montador.removeProduto(body);
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

  @Get('/categorias')
  async buscaCategorias() {
    return await this.montador.pegaTodasCategorias();
  }

  @Get('/volumes')
  async buscaVolumes() {
    return await this.montador.pegaTodosVolumes();
  }

  @Get('/generos')
  async buscaGeneros() {
    return await this.montador.pegaTodosGeneros();
  }

  @Get('/materiais')
  async buscaMateriais() {
    return await this.montador.pegaTodosMateriais();
  }

  @Get('/tamanhos')
  async buscaTamanhos() {
    return await this.montador.pegaTodosTamanhos();
  }

  @Get('/top3')
  async buscarTop3Produtos() {
    return await this.relatorio.top3Produtos();
  }
}
