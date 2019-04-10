import { Hemocentro } from 'src/doacaodesangue/model/hemocentro.entity';
import { genericInterface } from './interface/generic.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HemocentroService implements genericInterface<Hemocentro> {
  readAll(): Promise<Hemocentro[]> {
    throw new Error('Method not implemented.');
  }
  readOne(id: number): Promise<Hemocentro> {
    throw new Error('Method not implemented.');
  }
  Create(body: any): Promise<Hemocentro> {
    throw new Error('Method not implemented.');
  }
  Drop(body: any): Promise<Hemocentro> {
    throw new Error('Method not implemented.');
  }
  Update(body: any): Promise<Hemocentro> {
    throw new Error('Method not implemented.');
  }
}
