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
  
  @ApiUseTags('Produto')
  @Controller()
  export class ProdutoController {
    constructor(private readonly ProdutoService: ProdutoService) {}
    @Get('/Produto')
    root(): any {
      return this.ProdutoService.readAll();
    }
  
    @Get('/Produto/:id')
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
  
    @Post('/Produto')
    public createOne(@Body() body: any) {
      return this.ProdutoService.Create(body);
    }
  }
  