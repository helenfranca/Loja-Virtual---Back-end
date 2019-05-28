import { Injectable } from '@nestjs/common';
import { Pessoa } from 'src/doacaodesangue/model/pessoa.entity';
import { CriptografiaService } from './criptografia.logica';
import { PessoaService } from '../pessoa.service';

@Injectable()
export class Montador {
  constructor(private readonly servico: PessoaService) {}

  public pegaPessoas(): Promise<Pessoa[]> {
    return this.servico.readAll();
  }

  public leUmaPessoa(id): Promise<Pessoa> {
    return this.servico.readOne(id);
  }

  public montaPessoa(body: Pessoa) {
    let pessoa = new Pessoa();
    let cripto = new CriptografiaService();
    try {
      pessoa.nome = body.nome;
      pessoa.sobrenome = body.sobrenome;
      pessoa.datanascimento = body.datanascimento;

      //Validar CPF
      pessoa.cpf = body.cpf;
      pessoa.sexo = body.sexo;
      pessoa.email = body.email;
      pessoa.telefone = body.telefone;
      pessoa.senha = cripto.criptografar(body.senha);
      pessoa.status = true;
      return this.servico.Create(pessoa);
    } catch (err) {
      return err;
    }
  }

  public async alteraPessoa(body) {
    let cripto = new CriptografiaService();
    let pessoa = await Pessoa.findOne({ cpf: body.cpf });
    pessoa.telefone = body.telefone;
    pessoa.email = body.email;
    let senha = body.senha;
    pessoa.senha = cripto.criptografar(senha);
    this.servico.Update(pessoa);
  }
}
