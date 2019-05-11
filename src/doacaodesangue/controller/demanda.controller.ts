import { ApiUseTags } from "@nestjs/swagger";
import { Controller, Get, Res, Param, HttpStatus, Post, Body, Put } from "@nestjs/common";
import { DemandaService } from "../service/demanda.service";
import { Demanda } from "../model/demanda.entity";

@ApiUseTags('Demanda')
@Controller()
export class DemandaController {
  constructor(private readonly demandaService: DemandaService) {}

  @Get('/demanda')
  root(): any {
    return this.demandaService.readAll();
  }

  @Get('/demanda/:id')
  async readOne(@Res() res, @Param() id) {
    try {
      let demanda: Demanda = await this.demandaService.readOne(id.id);
      if (demanda != undefined) {
        res.status(HttpStatus.OK).send(demanda);
      } else {
        res
          .status(HttpStatus.NOT_FOUND)
          .send('Nenhuma demanda encontrada na busca');
      }
    } catch (err) {
      res.status(HttpStatus.BAD_GATEWAY).send(err.message);
    }
  }


  @Post('/demanda')
  public createOne(@Body() body: any): Promise<Demanda> {
    return this.demandaService.Create(body);
  }

  @Put('/demanda')
  public updateOne(@Body() body: any) {
    return this.demandaService.Update(body);
  }
}