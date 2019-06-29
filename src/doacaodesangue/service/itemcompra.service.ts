import { genericInterface } from "./interface/generic.interface";
import { ItemCompra } from "../model/itemcompra.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ItemCompraService implements genericInterface<ItemCompra> {
    readAll(): Promise<ItemCompra[]> {
        throw new Error("Method not implemented.");
    }    readOne(id: string | number): Promise<ItemCompra> {
        throw new Error("Method not implemented.");
    }
    
    async Create(body: any): Promise<ItemCompra> {
        try {
            return await ItemCompra.save(body);
          } catch (err) {
            throw new Error(
              `Erro ao salvar item da compra \n Erro: ${err.name}\n Mensagem: ${
                err.message
              }\n Os parametros estao certos?`,
            );
          }
    }

    Drop(body: any): Promise<ItemCompra> {
        throw new Error("Method not implemented.");
    }
    
    Update(body: any): Promise<ItemCompra> {
        throw new Error("Method not implemented.");
    }
}