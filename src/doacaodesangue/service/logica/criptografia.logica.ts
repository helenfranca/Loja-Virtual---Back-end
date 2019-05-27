import { Injectable } from '@nestjs/common';

const DADOS_CRIPTOGRAFAR = {
  algoritmo: 'aes256',
  codificacao: 'utf8',
  segredo: 'chaves',
  tipo: 'hex',
};

const crypto = require('crypto');

@Injectable()
export class CriptografiaService {
  criptografar(senha) {
    const cipher = crypto.createCipher(
      DADOS_CRIPTOGRAFAR.algoritmo,
      DADOS_CRIPTOGRAFAR.segredo,
    );
    cipher.update(senha);
    return cipher.final(DADOS_CRIPTOGRAFAR.tipo);
  }

  descriptografar(senha) {
    const decipher = crypto.createDecipher(
      DADOS_CRIPTOGRAFAR.algoritmo,
      DADOS_CRIPTOGRAFAR.segredo,
    );
    decipher.update(senha, DADOS_CRIPTOGRAFAR.tipo);
    return decipher.final(DADOS_CRIPTOGRAFAR.codificacao);
  }
}
