import {
    Controller,
    Get,
    Res,
    Param,
    HttpStatus,
    Body,
    Post,
  } from '@nestjs/common';
  import { HemocentroService } from '../service/hemocentro.service';
  import { Hemocentro } from '../model/hemocentro.entity';
  import { ApiUseTags } from '@nestjs/swagger';
  
  @ApiUseTags('')
  @Controller()
  export class hemocentroController {
    constructor(private readonly hemocentroService: HemocentroService) {}
    @Get('/hemocentro')
    root(): any {
      return this.hemocentroService.readAll();
    }
  
    @Get('/hemocentro/:id')
    async readOne(@Res() res, @Param() id) {
      try {
        let hemocentro: Hemocentro = await this.hemocentroService.readOne(id.id);
        if (hemocentro != undefined) {
          res.status(HttpStatus.OK).send(hemocentro);
        } else {
          res
            .status(HttpStatus.NOT_FOUND)
            .send('Nenhum atendente encontrado na busca');
        }
      } catch (err) {
        res.status(HttpStatus.BAD_GATEWAY).send(err.message);
      }
    }
  
    @Post('/hemocentro')
    public createOne(@Body() body: any) {
      return this.hemocentroService.Create(body);
    }
  }
  