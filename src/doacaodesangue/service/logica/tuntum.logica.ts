import { Injectable } from '@nestjs/common';
import { DoadorService } from '../doador.service';
import { Doador } from 'src/doacaodesangue/model/doador.entity';

@Injectable()
export class Tuntum {
  constructor(private readonly servicoDoador: DoadorService) {}

  public aptosDoar() {
    return this.servicoDoador.aptos();
  }

  public async aptoConvocar(tipo) {
    if (tipo.tipofator == 'O+') {
      let tipos = { Op: 'O+', On: 'O-' };
      return await this.servicoDoador.aptosConvocacaoOp(tipos);
    }
  }

  public doadorTipo() {
    return this.servicoDoador.doadoresTipo();
  }
}
