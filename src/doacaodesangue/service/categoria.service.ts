import { Categoria, CategoriaEnum } from '../model/categoria.entity';
import { genericInterface } from './interface/generic.interface';

export class CategoriaService implements genericInterface<Categoria> {
  readAll(): Promise<Categoria[]> {
    return Categoria.find();
  }
  readOne(id: number): Promise<Categoria> {
    return Categoria.findOne({ id: id });
  }
  async Create(): Promise<Categoria> {
    let categoria = new Categoria();
    let categoria1 = new Categoria();
    let categoria2 = new Categoria();
    try {
      categoria.categoria = CategoriaEnum.Caneca;
      categoria1.categoria = CategoriaEnum.Botton;
      categoria2.categoria = CategoriaEnum.Camisa;

      await Categoria.save(categoria);
      await Categoria.save(categoria1);
      return await Categoria.save(categoria2);
    } catch (err) {
      throw new Error(
        `Erro ao salvar Categoria \n Erro: ${err.name}\n Mensagem: ${
          err.message
        }\n Os categorias inseridas estão corretas?`,
      );
    }
  }
  Drop(body: any): Promise<Categoria> {
    throw new Error('Method not implemented.');
  }
  Update(body: any): Promise<Categoria> {
    throw new Error('Method not implemented.');
  }
}
