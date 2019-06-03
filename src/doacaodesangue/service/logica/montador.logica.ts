import { Injectable } from '@nestjs/common';
import { Pessoa } from 'src/doacaodesangue/model/pessoa.entity';
import { CriptografiaService } from './criptografia.logica';
import { PessoaService } from '../pessoa.service';
import { Produto } from 'src/doacaodesangue/model/produto.entity';
import { CaracteristicasProdutoService } from '../caracteristicasProduto.service';
import { ProdutoService } from '../produto.service';
import { Hemocentro } from 'src/doacaodesangue/model/hemocentro.entity';
import { HemocentroService } from '../hemocentro.service';
import { Doador } from 'src/doacaodesangue/model/doador.entity';
import { DoadorService } from '../doador.service';
import { TipoSanguineoService } from '../tiposanguineo.service';
import { Doacao } from 'src/doacaodesangue/model/doacao.entity';
import { DoacaoService } from '../doacao.service';
import { ObservacaoService } from '../observacao.service';
import { DemandaService } from '../demanda.service';
import { Demanda, StatusEnum } from 'src/doacaodesangue/model/demanda.entity';
import { ConvocacaoLogica } from './convocacao.logica';
import { TipoSanguineo } from 'src/doacaodesangue/model/tiposanguineo.entity';

@Injectable()
export class Montador {
  constructor(
    private readonly servicoPessoa: PessoaService,
    private readonly servicoProduto: ProdutoService,
    private readonly servicoHemocentro: HemocentroService,
    private readonly servicoDoador: DoadorService,
    private readonly servicoDoacao: DoacaoService,
    private readonly servicoDemanda: DemandaService,
    private readonly servicoTipoSanguineo: TipoSanguineoService,
    private readonly logicaConvocacao: ConvocacaoLogica,
  ) {}

  // ~~~~~~~~~~~~~~~~~~ //
  //      PESSOA        //
  // ~~~~~~~~~~~~~~~~~~ //

  public pegaPessoas(): Promise<Pessoa[]> {
    return this.servicoPessoa.readAll();
  }

  public leUmaPessoa(id): Promise<Pessoa> {
    return this.servicoPessoa.readOne(id);
  }

  public montaPessoa(body: Pessoa) {
    var moment = require('moment');
    var data = moment(body.datanascimento, 'DD/MM/YYYY');
    //Feito isso basta definir o formato de saída:

    let pessoa = new Pessoa();
    let cripto = new CriptografiaService();
    try {
      pessoa.nome = body.nome;
      pessoa.sobrenome = body.sobrenome;

      pessoa.datanascimento = data.format('YYYY-MM-DD');

      //Validar CPF
      pessoa.cpf = body.cpf;

      pessoa.sexo = body.sexo;
      pessoa.email = body.email;
      pessoa.telefone = body.telefone;
      pessoa.senha = cripto.criptografar(body.senha);
      pessoa.status = true;
      return this.servicoPessoa.Create(pessoa);
    } catch (err) {
      return err;
    }
  }

  public async deletaPessoa(body: Pessoa) {
    try {
      let pessoa = await Pessoa.findOne({ cpf: body.cpf });
      pessoa.status = false;
      this.servicoPessoa.Drop(pessoa);
    } catch (err) {
      return err;
    }
  }

  public async alteraPessoa(body: Pessoa): Promise<Pessoa> {
    try {
      let cripto = new CriptografiaService();
      let pessoa = await Pessoa.findOne({ cpf: body.cpf });
      pessoa.telefone = body.telefone;
      pessoa.email = body.email;
      let senha = body.senha;
      pessoa.senha = cripto.criptografar(senha);
      return await this.servicoPessoa.Update(pessoa);
    } catch (err) {
      return err;
    }
  }

  // ~~~~~~~~~~~~~~~~~~ //
  //      PRODUTO       //
  // ~~~~~~~~~~~~~~~~~~ //

  public pegaProdutos(): Promise<Produto[]> {
    return this.servicoProduto.readAll();
  }

  public leUmProduto(id): Promise<Produto> {
    return this.servicoProduto.readOne(id);
  }

  public async montaProduto(body): Promise<Produto> {
    try {
      let produto = new Produto();
      produto.nome = body.nome;
      produto.quantidade = body.quantidade;
      produto.descricao = body.descricao;
      produto.valorunitario = body.valorunitario;

      let tipo = new CaracteristicasProdutoService();
      let categoria = await tipo.buscaOneCategoria(body.idcategoria);

      if (categoria != undefined) {
        produto.categoria = categoria;

        let material = await tipo.buscaOneMaterial(body.idmaterial);
        if (material != undefined) {
          produto.material = material;

          let tamanho = await tipo.buscaOneTamanho(body.idtamanho);
          if (tamanho != undefined) {
            produto.tamanho = tamanho;

            let genero = await tipo.buscaOneGenero(body.idgenero);
            if (genero != undefined) {
              produto.genero = genero;

              let volume = await tipo.buscaOneVolume(body.idvolume);
              if (volume != undefined) {
                produto.volume = volume;
              }
            }
          }
        }
      }
      return this.servicoProduto.Create(produto);
    } catch (err) {}
  }

  public async alteraProduto(body): Promise<Produto> {
    try {
      let produto = await Produto.findOne({ id: body.id });

      produto.nome = body.nome;
      produto.quantidade = body.quantidade;
      produto.descricao = body.descricao;
      produto.valorunitario = body.valorunitario;

      let tipo = new CaracteristicasProdutoService();
      let categoria = await tipo.buscaOneCategoria(body.idcategoria);

      if (categoria != undefined) {
        produto.categoria = categoria;

        let material = await tipo.buscaOneMaterial(body.idmaterial);
        if (material != undefined) {
          produto.material = material;

          let tamanho = await tipo.buscaOneTamanho(body.idtamanho);
          if (tamanho != undefined) {
            produto.tamanho = tamanho;

            let genero = await tipo.buscaOneGenero(body.idgenero);
            if (genero != undefined) {
              produto.genero = genero;

              let volume = await tipo.buscaOneVolume(body.idvolume);
              if (volume != undefined) {
                produto.volume = volume;
              }
            }
          }
        }
      }
      return this.servicoProduto.Update(produto);
    } catch (err) {
      return err;
    }
  }

  public buscaParametro(parametro: string) {
    return this.servicoProduto.buscaProdutoParam(parametro);
  }

  public camisas() {
    return this.servicoProduto.buscaCamisas();
  }

  public canecas() {
    return this.servicoProduto.buscaCanecas();
  }

  public bottons() {
    return this.servicoProduto.buscaBottons();
  }

  // ~~~~~~~~~~~~~~~~~~ //
  //     Hemocentro     //
  // ~~~~~~~~~~~~~~~~~~ //

  public pegaHemocentros(): Promise<Hemocentro[]> {
    return this.servicoHemocentro.readAll();
  }

  public leUmHemocentro(id): Promise<Hemocentro> {
    return this.servicoHemocentro.readOne(id);
  }

  public async montaHemocentro(body: Hemocentro): Promise<Hemocentro> {
    let hemocentro = new Hemocentro();
    let cripto = new CriptografiaService();
    try {
      hemocentro.nome = body.nome;
      hemocentro.cnes = body.cnes;
      hemocentro.telefone = body.telefone;
      hemocentro.email = body.email;
      hemocentro.senha = cripto.criptografar(body.senha);
      hemocentro.status = true;
      return await this.servicoHemocentro.Create(hemocentro);
    } catch (err) {
      return err;
    }
  }

  public async deletarHemocentro(body: Hemocentro): Promise<Hemocentro> {
    try {
      let hemocentro = await Hemocentro.findOne(body.id);
      hemocentro.status = false;
      return this.servicoHemocentro.Drop(hemocentro);
    } catch (err) {
      return err;
    }
  }

  public async alteraHemocentro(body) {
    try {
      let cripto = new CriptografiaService();
      let busca = await Hemocentro.findOne({ cnes: body.cnes });
      busca.nome = body.nome;
      busca.cnes = body.cnes;
      busca.telefone = body.telefone;
      busca.email = body.email;
      let senha = body.senha;
      busca.senha = cripto.criptografar(senha);
      return this.servicoHemocentro.Update(busca);
    } catch (err) {
      return err;
    }
  }

  // ~~~~~~~~~~~~~~~~~~ //
  //       Doador       //
  // ~~~~~~~~~~~~~~~~~~ //

  public pegaDoadores(): Promise<Doador[]> {
    return this.servicoDoador.readAll();
  }

  public leUmDoador(id): Promise<Doador> {
    return this.servicoDoador.readOne(id);
  }

  public async montaDoador(body): Promise<Doador> {
    let doador = new Doador();
    try {
      let pessoa = await this.servicoPessoa.pessoaCpf(body);
      if (pessoa != undefined) {
        doador.pessoa = pessoa;

        let tiposangue = await this.servicoTipoSanguineo.buscaOne(
          body.tiposanguineo,
        );
        if (tiposangue != undefined) {
          doador.tiposanguineo = tiposangue;
          doador.doenca_chagas = body.chagas;
          doador.drogailicita = body.droga;
          doador.hepatite11 = body.hepatite11;
          doador.hepatiteb = body.hepatiteb;
          doador.hepatitec = body.hepatitec;
          doador.hiv = body.hiv;
          doador.htlv = body.htlv;
          doador.malaria = body.malaria;

          if (
            body.chagas ||
            body.droga ||
            body.hepatite11 ||
            body.hepatiteb ||
            body.hepatitec ||
            body.hiv ||
            body.htlv ||
            body.malaria
          ) {
            doador.apto = false;
          } else {
            doador.apto = true;
          }
          return await this.servicoDoador.Create(doador);
        }
      }
    } catch (err) {
      return err;
    }
  }

  public async deletarDoador(body: Doador): Promise<Doador> {
    try {
      let busca = await Doador.findOne({ id: body.id });
      busca.apto = false;
      return this.servicoDoador.Drop(busca);
    } catch (err) {
      return err;
    }
  }

  public async alteraDoador(body) {
    try {
      let busca = await Doador.findOne({ id: body.id });
      //Saude
      busca.doenca_chagas = body.chagas;
      busca.drogailicita = body.droga;
      busca.hepatite11 = body.hepatite11;
      busca.hepatiteb = body.hepatiteb;
      busca.hepatitec = body.hepatitec;
      busca.hiv = body.hiv;
      busca.htlv = body.htlv;
      busca.malaria = body.malaria;

      if (
        body.chagas ||
        body.droga ||
        body.hepatite11 ||
        body.hepatiteb ||
        body.hepatitec ||
        body.hiv ||
        body.htlv ||
        body.malaria
      ) {
        busca.apto = false;
      }
      return this.servicoHemocentro.Update(busca);
    } catch (err) {
      return err;
    }
  }

  // ~~~~~~~~~~~~~~~~~~ //
  //       Doação       //
  // ~~~~~~~~~~~~~~~~~~ //

  public pegaDoacoes(): Promise<Doacao[]> {
    return this.servicoDoacao.readAll();
  }

  public leUmaDoacao(id): Promise<Doacao> {
    return this.servicoDoacao.readOne(id);
  }

  public async montaDoacao(body): Promise<Doacao> {
    let doacao: Doacao = new Doacao();
    try {
      let pessoa = await this.servicoPessoa.pessoaCpf(body);
      let doador = await this.servicoDoador.doador(pessoa);
      let hemocentro = await this.servicoHemocentro.hemocentro(body);

      doacao.quantidade = body.quantidade;
      doacao.datadoacao = new Date().toLocaleDateString();
      doacao.doador = doador;
      doacao.hemocentro = hemocentro;

      let confirma = await this.servicoDoacao.Create(doacao);

      if (body.observacao != undefined) {
        let obs = {};
        obs['observacao'] = body.observacao;
        obs['iddoacao'] = confirma;

        let observacaoService = new ObservacaoService();
        await observacaoService.Create(obs);
      }
      return confirma;
    } catch (err) {
      return err;
    }
  }

  public async deletarDoacao(body: Doacao): Promise<Doacao> {
    return this.servicoDoacao.Drop(body);
  }

  public async alteraDoacao(body) {
    try {
      let busca = await this.servicoDoacao.readOne(body);
      busca.quantidade = body.quantidade;

      return this.servicoDoacao.Update(busca);
    } catch (err) {
      return err;
    }
  }

  public pegaDoacoesDoador(id) {
    return this.servicoDoacao.getDoacoesDoador(id);
  }

  // ~~~~~~~~~~~~~~~~~~ //
  //       Demanda      //
  // ~~~~~~~~~~~~~~~~~~ //

  public pegaDemanda(): Promise<Demanda[]> {
    return this.servicoDemanda.readAll();
  }

  public leUmaDemanda(id: number): Promise<Demanda> {
    return this.servicoDemanda.readOne(id);
  }

  public async montaDemanda(body): Promise<Demanda> {
    let demanda: Demanda = new Demanda();
    try {
      let hemocentro: Hemocentro = await this.servicoHemocentro.readOne(
        body.idhemocentro,
      );
      let tiposangue: TipoSanguineo = await this.servicoTipoSanguineo.buscaOne(
        body.tiposanguineo,
      );

      demanda.status = StatusEnum.Aberta;
      demanda.data = new Date().toLocaleDateString();
      demanda.hemocentro = hemocentro;
      demanda.tiposanguineo = tiposangue;

      let demandaInsert: Demanda = await this.servicoDemanda.Create(demanda);
      if (demandaInsert != undefined) {
        await this.logicaConvocacao.convocar(demandaInsert);
        return demandaInsert;
      }
    } catch (err) {
      return err;
    }
  }

  public async deletarDemanda(body: Demanda): Promise<Demanda> {
    try {
      let demanda = await this.servicoDemanda.readOne(body.id);
      demanda.status = StatusEnum.Fechada;
      return this.servicoDemanda.Drop(demanda);
    } catch (err) {
      return err;
    }
  }

  public async alteraDemanda(body): Promise<Demanda> {
    try {
      return await this.servicoDemanda.Update(body);
    } catch (err) {
      return err;
    }
  }
}
