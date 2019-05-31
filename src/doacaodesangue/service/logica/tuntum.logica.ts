import { Injectable } from '@nestjs/common';
import { DoadorService } from '../doador.service';

@Injectable()
export class Tuntum {
  constructor(private readonly servicoDoador: DoadorService) {}

  public aptosDoar() {
    return this.servicoDoador.aptos();
  }

  public aptoConvocar(tipo) {
    return this.servicoDoador.aptosConvocacao(tipo);
  }

  public doadorTipo() {
    return this.servicoDoador.doadoresTipo();
  }
}
