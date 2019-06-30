import { genericInterface } from './interface/generic.interface';
import { Injectable } from '@nestjs/common';
import { Pessoa } from '../model/pessoa.entity';
import { Administrador } from '../model/administrador.entity';

@Injectable()
export class AdministradorService implements genericInterface<Administrador> {
  async pessoaAdmin(pessoa: Pessoa): Promise<Administrador> {
    // console.log(email, senha);
    let a = await Administrador.findOne({ pessoa: pessoa });
    console.log(a);
    return a;
  }

  async readAll(): Promise<Administrador[]> {
    return await Administrador.find();
  }

  async adminMatricula(matricula): Promise<Administrador> {
    return await Administrador.findOne({ matricula: matricula });
  }

  // Caso precise descriptar a senha
  async readOne(id: number): Promise<Administrador> {
    return await Administrador.findOne({ id: id });
  }

  Create(body: any): Promise<Administrador> {
    throw new Error('Method not implemented.');
  }
  Drop(body: any): Promise<Administrador> {
    throw new Error('Method not implemented.');
  }
  Update(body: any): Promise<Administrador> {
    throw new Error('Method not implemented.');
  }
}
