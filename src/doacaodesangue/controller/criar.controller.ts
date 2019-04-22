import { MaterialService } from '../service/material.service';
import { CategoriaService } from '../service/categoria.service';
import { Controller, Get } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('criar')
@Controller()
export class CriarController {
  constructor(
    private readonly MaterialService: MaterialService,
    private readonly CategoriaService: CategoriaService,
  ) {}

  @Get('/criar')
  async root(): Promise<any> {
    await this.MaterialService.Create();
    await this.CategoriaService.Create();
    return await 'Criado!';
  }
}
