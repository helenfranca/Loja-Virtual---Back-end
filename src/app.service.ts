import { Injectable } from '@nestjs/common';
import { ConvocacaoService } from './doacaodesangue/service/convocacao.service';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Sistema de convocação de doação de Sangue!';
  }
}
