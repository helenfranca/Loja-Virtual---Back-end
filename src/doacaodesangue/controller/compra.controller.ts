import {
    Controller,
    Get,
    Post,
    Body,
    Res,
    HttpStatus,
    Param,
    Put,
  } from '@nestjs/common';
  import { ApiUseTags } from '@nestjs/swagger';
  import { Compra } from '../model/compra.entity';
  import { Montador } from '../service/logica/montador.logica';
  
  @ApiUseTags('Compra')
  @Controller()
  export class CompraController {
    constructor(
      private readonly montador: Montador
    ) {}
    @Get('/compra')
    root(): any {
      return this.montador.buscarTodasCompras();
    }
    
    @Get('/compra/:id')
    async readOne(@Res() res, @Param() id) {
      try {
        let compra: Compra = await this.montador.buscarCompra(id.id);
        if (compra != undefined) {
          res.status(HttpStatus.OK).send(compra);
        } else {
          res
            .status(HttpStatus.NOT_FOUND)
            .send('A compra solicitada não foi encontrada');
        }
      } catch (err) {
        res.status(HttpStatus.BAD_GATEWAY).send(err.message);
      }
    }
  
    @Post('/compra')
    public createOne(@Body() body: any): Promise<Compra> {
      return this.montador.montaCompra(body);
    }
  
    @Put('/compra')
    public updateOne(@Body() body: any) {
      throw new Error('Method not implemented.');
    }
  }
  