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
    } else if (tipo.tipofator == 'O-') {
      let tipos = { On: 'O-' };
      return await this.servicoDoador.aptosConvocacaoOn(tipos);
    } else if (tipo.tipofator == 'A+') {
      let tipos = { Ap: 'A+', An: 'A-', Op: 'O+', On: 'O-' };
      return await this.servicoDoador.aptosConvocacaoAp(tipos);
    } else if (tipo.tipofator == 'A-') {
      let tipos = { An: 'A-', On: 'O-' };
      return await this.servicoDoador.aptosConvocacaoAn(tipos);
    } else if (tipo.tipofator == 'AB+') {
      return await this.servicoDoador.aptos();
    } else if (tipo.tipofator == 'AB-') {
      let tipos = { An: 'A-', Bn: 'B-', On: 'O-', ABn: 'AB-' };
      return await this.servicoDoador.aptosConvocacaoABn(tipos);
    } else if (tipo.tipofator == 'B+') {
      let tipos = { Bp: 'B+', Bn: 'B-', On: 'O-', Op: 'O+' };
      return await this.servicoDoador.aptosConvocacaoBp(tipos);
    } else if (tipo.tipofator == 'B-') {
      let tipos = { Bn: 'B-', On: 'O-' };
      return await this.servicoDoador.aptosConvocacaoBn(tipos);
    }
  }

  public doadorTipo() {
    return this.servicoDoador.doadoresTipo();
  }
}
