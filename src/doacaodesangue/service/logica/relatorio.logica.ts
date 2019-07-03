import { Injectable } from '@nestjs/common';
import { HemocentroService } from '../hemocentro.service';
import { DemandaService } from '../demanda.service';
import { ProdutoService } from '../produto.service';
import { Double } from 'typeorm';

@Injectable()
export class Relatorio {
  constructor(
    private readonly servicoHemocentro: HemocentroService,
    private readonly servicoDemanda: DemandaService,
    private readonly servicoProduto: ProdutoService,
  ) {}

  public async hemocentroDemanda() {
    return await this.servicoHemocentro.hemocentroDemanda();
  }

  public async demandaTipo() {
    return await this.servicoDemanda.demandaTipo();
  }

  public async top3Produtos() {
    let produtos = await this.servicoProduto.buscaTop3Produtos();
    let idProdutos: number[] = [];
    let qtdProdutos: number[] = [];
    let valorProdutos: Double[] = [];
    let nomeProdutos: string[] = [];
    let urlProdutos: string[] = [];
    let totalProdutos = 0;
    for (let ic of produtos) {
      totalProdutos += ic.quantidade;
      if (!idProdutos.includes(ic.id)) {
        idProdutos.push(ic.id);
        qtdProdutos.push(ic.quantidade);
        valorProdutos.push(ic.valorunitario);
        nomeProdutos.push(ic.nome);
        urlProdutos.push(ic.url);
      } else {
        let ind = idProdutos.indexOf(ic.id);
        qtdProdutos[ind] += ic.quantidade;
      }
    }

    let relatorio = [];
    for (let prod of idProdutos) {
      let produto = {
        produto: {
          id: prod,
          nome: nomeProdutos[idProdutos.indexOf(prod)],
          valor: valorProdutos[idProdutos.indexOf(prod)],
        },
        imagem: {
          url: urlProdutos[idProdutos.indexOf(prod)],
        },
        porcentagem:
          (qtdProdutos[idProdutos.indexOf(prod)] / totalProdutos) * 100,
      };
      relatorio.push(produto);
    }
    relatorio.sort(function(a, b): any {
      relatorio.push(b.porcentagem - a.porcentagem);
    });
    return relatorio.slice(0, 3);
  }
}
