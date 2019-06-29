import { Injectable } from '@nestjs/common';
import { TipoSanguineo } from '../model/tiposanguineo.entity';

@Injectable()
export class TipoSanguineoService {
  async buscaOne(tipo: string) {
    return await TipoSanguineo.createQueryBuilder('tiposanguineo')
      .select('tiposanguineo.*')
      .where('tiposanguineo.tipofator = :name', { name: tipo })
      .getRawOne();
  }
}
