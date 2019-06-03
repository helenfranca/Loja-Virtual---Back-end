import { Injectable } from '@nestjs/common';
import { DoadorService } from '../doador.service';
import { Doador } from 'src/doacaodesangue/model/doador.entity';

@Injectable()
export class Tuntum {
  constructor(private readonly servicoDoador: DoadorService) {}

  public aptosDoar() {
    return this.servicoDoador.aptos();
  }

  public async aptoConvocar(tipo: { tipofator: string }) {
    if (tipo.tipofator == 'O+') {
      let tipos = { Op: 'O+', On: 'O-' };
      return await this.servicoDoador.aptosConvocacaoOpositivo(tipos);
    } else if (tipo.tipofator == 'O-') {
      let tipos = { On: 'O-' };
      return await this.servicoDoador.aptosConvocacaoOnegativo(tipos);
    } else if (tipo.tipofator == 'A+') {
      let tipos = { Ap: 'A+', An: 'A-', Op: 'O+', On: 'O-' };
      return await this.servicoDoador.aptosConvocacaoApositivo(tipos);
    } else if (tipo.tipofator == 'A-') {
      let tipos = { An: 'A-', On: 'O-' };
      return await this.servicoDoador.aptosConvocacaoAnegativo(tipos);
    } else if (tipo.tipofator == 'AB+') {
      return await this.servicoDoador.aptos();
    } else if (tipo.tipofator == 'AB-') {
      let tipos = { An: 'A-', Bn: 'B-', On: 'O-', ABn: 'AB-' };
      return await this.servicoDoador.aptosConvocacaoABnegativo(tipos);
    } else if (tipo.tipofator == 'B+') {
      let tipos = { Bp: 'B+', Bn: 'B-', On: 'O-', Op: 'O+' };
      return await this.servicoDoador.aptosConvocacaoBpositivo(tipos);
    } else if (tipo.tipofator == 'B-') {
      let tipos = { Bn: 'B-', On: 'O-' };
      return await this.servicoDoador.aptosConvocacaoBnegativo(tipos);
    }
  }

  public doadorTipo() {
    return this.servicoDoador.doadoresTipo();
  }
}
