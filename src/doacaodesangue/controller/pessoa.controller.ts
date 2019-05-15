import {
  Controller,
  Get,
  Res,
  Param,
  HttpStatus,
  Body,
  Post,
  Put,
} from '@nestjs/common';
import { PessoaService } from '../service/pessoa.service';
import { Pessoa } from '../model/pessoa.entity';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('Pessoa')
@Controller()
export class PessoaController {
  constructor(private readonly pessoaService: PessoaService) {}
  @Get('/pessoa')
  root(): any {
    return this.pessoaService.readAll();
  }

  @Get('/pessoa/:id')
  async readOne(@Res() res, @Param() id) {
    try {
      let pessoa: Pessoa = await this.pessoaService.readOne(id.id);
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
  public createOne(@Body() body: any): Promise<Pessoa> {
    return this.pessoaService.Create(body);
  }

  @Put('/pessoa')
  public updateOne(@Body() body: any) {
    return this.pessoaService.Update(body);
  }
  @Post('/auth/login/')
  public login(@Body() body: any) {
    console.log(body.email, body.senha);
    return this.pessoaService.Login(body);
  }
}
