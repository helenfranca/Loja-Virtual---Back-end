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
    return await this.servicoDoador.aptosConvocacao(tipo);
  }

  public doadorTipo() {
    return this.servicoDoador.doadoresTipo();
  }
}
