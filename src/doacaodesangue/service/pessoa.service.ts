import { Pessoa } from 'src/doacaodesangue/model/pessoa.entity';
import { genericInterface } from './interface/generic.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PessoaService implements genericInterface<Pessoa> {
  readAll(): Promise<Pessoa[]> {
    throw new Error('Method not implemented.');
  }
  readOne(id: number): Promise<Pessoa> {
    throw new Error('Method not implemented.');
  }
  Create(body: any): Promise<Pessoa> {
    throw new Error('Method not implemented.');
  }
  Drop(body: any): Promise<Pessoa> {
    throw new Error('Method not implemented.');
  }
  Update(body: any): Promise<Pessoa> {
    throw new Error('Method not implemented.');
  }
}
