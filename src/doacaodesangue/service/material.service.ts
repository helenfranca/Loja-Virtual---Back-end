import { genericInterface } from './interface/generic.interface';
import { Material, MaterialEnum } from '../model/material.entity';

export class MaterialService implements genericInterface<Material> {
  readAll(): Promise<Material[]> {
    return Material.find();
  }
  readOne(id: number): Promise<Material> {
    return Material.findOne({ id: id });
  }
  async Create(): Promise<Material> {
    let material = new Material();
    let material1 = new Material();
    let material2 = new Material();
    let material3 = new Material();
    let material4 = new Material();

    try {
      material.material = MaterialEnum.Algodão;
      material1.material = MaterialEnum.Aluminio;
      material2.material = MaterialEnum.Malha;
      material3.material = MaterialEnum.Plastico;
      material4.material = MaterialEnum.Porcelana;

      await Material.save(material);
      await Material.save(material1);
      await Material.save(material2);
      await Material.save(material3);
      return await Material.save(material4);
    } catch (err) {
      throw new Error(
        `Erro ao salvar Material \n Erro: ${err.name}\n Mensagem: ${
          err.message
        }\n Os materiais inseridos estão corretos?`,
      );
    }
  }
  Drop(body: any): Promise<Material> {
    throw new Error('Method not implemented.');
  }
  Update(body: any): Promise<Material> {
    throw new Error('Method not implemented.');
  }
}
