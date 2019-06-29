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
import { MunicipioService } from '../municipio.service';
import { EstadoService } from '../estado.service';
import { Endereco } from 'src/doacaodesangue/model/endereco.entity';
import { EnderecoService } from '../endereco.service';
import { Bairro } from 'src/doacaodesangue/model/bairro.entity';
import { Municipio } from 'src/doacaodesangue/model/municipio.entity';
import { Estado } from 'src/doacaodesangue/model/estado.entity';
import { BairroService } from '../bairro.service';
import { Imagem } from 'src/doacaodesangue/model/imagem.entity';
import { Categoria } from 'src/doacaodesangue/model/categoria.entity';
import { Material } from 'src/doacaodesangue/model/material.entity';
import { Tamanho } from 'src/doacaodesangue/model/tamanho.entity';
import { Genero } from 'src/doacaodesangue/model/genero.entity';
import { Volume } from 'src/doacaodesangue/model/volume.entity';
import {
  CategoriaEnum,
  MaterialEnum,
  TamanhoEnum,
  GeneroEnum,
  VolumeEnum,
} from 'src/doacaodesangue/model/Enum';
import { FuncionamentoService } from '../funcionamento.service';
import {
  Funcionamento,
  DiaSemanaEnum,
} from 'src/doacaodesangue/model/funcionamento.entity';
import { Compra } from 'src/doacaodesangue/model/compra.entity';
import { ItemCompra } from 'src/doacaodesangue/model/itemcompra.entity';
import { ItemCompraService } from 'src/doacaodesangue/service/itemcompra.service';
import { CompraService } from '../compra.service';

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
    private readonly servicoEstado: EstadoService,
    private readonly servicoMunicipio: MunicipioService,
    private readonly servicoEndereco: EnderecoService,
    private readonly servicoBairro: BairroService,
    private readonly servicoFuncionamento: FuncionamentoService,
    private readonly servicoCompra: CompraService,
    private readonly servicoCaracteristicas: CaracteristicasProdutoService,
    private readonly servicoItemCompra: ItemCompraService,
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

  public leporCpf(cpf): Promise<Pessoa> {
    console.log(cpf);
    return this.servicoPessoa.pessoaCpf(cpf);
  }

  public async pessoa_endereco(pessoa: Pessoa, enderecoNovo: Endereco) {
    pessoa.enderecos.push(enderecoNovo);

    return this.servicoPessoa.Update(pessoa);
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

      //Procura o existentes
      let tipo = new CaracteristicasProdutoService();
      let imagem: Imagem = await tipo.buscaUrl(body.url);
      let categoria: Categoria = await tipo.buscaOneCategoria(body.categoria);
      let material: Material = await tipo.buscaOneMaterial(
        MaterialEnum[body.material],
      );
      let tamanho: Tamanho = await tipo.buscaOneTamanho(
        TamanhoEnum[body.tamanho],
      );
      let genero: Genero = await tipo.buscaOneGenero(body.genero);
      let volume: Volume = await tipo.buscaOneVolume(body.volume);

      // Caso não exista...

      //Imagem
      if (imagem == undefined) {
        let ima = new Imagem();
        ima.url = body.url;
        imagem = await tipo.createImagem(ima);
        produto.imagem = imagem;
      } else {
        produto.imagem = imagem;
      }

      // Categoria
      if (categoria == undefined) {
        let cat = new Categoria();
        cat.nome = body.categoria;

        if (cat.nome in CategoriaEnum) {
          cat.nome = CategoriaEnum[cat.nome];
          categoria = await tipo.createCategoria(cat);
          produto.categoria = categoria;
        }
      } else {
        produto.categoria = categoria;
      }

      //Material
      if (material == undefined) {
        let mat = new Material();
        mat.material = body.material;

        if (mat.material in MaterialEnum) {
          mat.material = MaterialEnum[mat.material];
          material = await tipo.createMaterial(mat);
          produto.material = material;
        }
      } else {
        produto.material = material;
      }

      //Tamanho
      if (tamanho == undefined) {
        let tam = new Tamanho();
        tam.tamanho = body.tamanho;

        if (tam.tamanho in TamanhoEnum) {
          tam.tamanho = TamanhoEnum[tam.tamanho];
          tamanho = await tipo.createTamanho(tam);
          produto.tamanho = tamanho;
        }
      } else {
        produto.tamanho = tamanho;
      }

      //Genero
      if (genero == undefined) {
        let gen = new Genero();
        gen.genero = body.genero;

        if (gen.genero in GeneroEnum) {
          gen.genero = GeneroEnum[gen.genero];
          genero = await tipo.createGenero(gen);
          produto.genero = genero;
        }
      } else {
        produto.genero = genero;
      }

      //Volume
      if (volume == undefined) {
        let vol = new Volume();
        vol.quantidade = body.volume;

        if (vol.quantidade in VolumeEnum) {
          vol.quantidade = VolumeEnum[vol.quantidade];
          volume = await tipo.createVolume(vol);
          produto.volume = volume;
        }
      } else {
        produto.volume = volume;
      }
      if (await this.verificaProduto(produto)) {
        return await this.servicoProduto.Create(produto);
      } else {
        return new Produto();
      }
    } catch (err) {
      return err;
    }
  }

  async verificaProduto(produto: Produto): Promise<Boolean> {
    if (
      produto.imagem &&
      produto.material &&
      produto.quantidade &&
      produto.tamanho &&
      produto.volume &&
      produto.genero &&
      produto.nome &&
      produto.valorunitario &&
      produto.categoria != undefined
    ) {
      return true;
    } else {
      return false;
    }
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
    let param = 'camisa';
    return this.servicoProduto.buscaProduto(param);
  }

  public canecas() {
    let param = 'caneca';
    return this.servicoProduto.buscaProduto(param);
  }

  public bottons() {
    let param = 'botton';
    return this.servicoProduto.buscaProduto(param);
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

  public async montaHemocentro(
    body: Hemocentro,
    endereco: Endereco,
  ): Promise<Hemocentro> {
    let hemocentro = new Hemocentro();
    let cripto = new CriptografiaService();
    try {
      let hemo = await this.servicoHemocentro.readHemocentro(body.cnes);

      if (hemo != undefined) {
        return hemo;
      } else {
        hemocentro.nome = body.nome;
        hemocentro.cnes = body.cnes;
        hemocentro.telefone = body.telefone;
        hemocentro.email = body.email;
        hemocentro.senha = cripto.criptografar(body.senha);
        hemocentro.status = true;
        hemocentro.endereco = endereco;

        return await this.servicoHemocentro.Create(hemocentro);
      }
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

  public async alteraHemocentro(body: any) {
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
  //   Funcionamento   //
  // ~~~~~~~~~~~~~~~~~~ //

  public async horarioFuncionamento(body, hemocentro: Hemocentro) {
    let periodos: Funcionamento[] = [];
    for (let func of body.funcionamento) {
      let diaFunc = new Funcionamento();
      diaFunc.horaAbertura = func.abertura;
      diaFunc.horaFechamento = func.fechamento;
      diaFunc.hemocentro = hemocentro;
      let idDia: DiaSemanaEnum;
      switch (func.dia) {
        case 'Segunda': {
          idDia = DiaSemanaEnum.Segunda;
          break;
        }
        case 'Terca': {
          idDia = DiaSemanaEnum.Terca;
          break;
        }
        case 'Quarta': {
          idDia = DiaSemanaEnum.Quarta;
          break;
        }
        case 'Quinta': {
          idDia = DiaSemanaEnum.Quinta;
          break;
        }
        case 'Sexta': {
          idDia = DiaSemanaEnum.Sexta;
          break;
        }
        case 'Sabado': {
          idDia = DiaSemanaEnum.Sexta;
          break;
        }
        case 'Domingo': {
          idDia = DiaSemanaEnum.Domingo;
          break;
        }
      }
      diaFunc.diaFuncionamento = idDia;
      let ret = await this.servicoFuncionamento.findOne(
        hemocentro.id,
        diaFunc.diaFuncionamento,
      );
      if (ret == undefined) {
        periodos.push(await this.servicoFuncionamento.Create(diaFunc));
      } else {
        periodos.push(ret);
      }
    }
    return periodos;
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
      let pessoa = await this.servicoPessoa.pessoaCpf(body.cpf);

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
      let pessoa: Pessoa = await this.servicoPessoa.pessoaCpf(body.cpf);

      let doador: Doador = await this.servicoDoador.doador(pessoa);

      let hemocentro: Hemocentro = await this.servicoHemocentro.hemocentro(
        body,
      );

      doacao.quantidade = body.quantidade;
      doacao.datadoacao = new Date().toLocaleDateString();
      doacao.doador = doador;
      doacao.hemocentro = hemocentro;

      let confirma: Doacao = await this.servicoDoacao.Create(doacao);
      // console.log(confirma);
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
      let hemocentro: Hemocentro = await this.servicoHemocentro.readHemocentro(
        body.hemocentro,
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

  // ~~~~~~~~~~~~~~~~~~~ //
  //       Endereco      //
  //  A criação aqui será em cascata
  // Endereço > Bairro > Municipio > Estado
  // Para todos eles precisa verificar a existência antes de criar, se existe retorna o existente, se não, cria e retorna.
  // ~~~~~~~~~~~~~~~~~~ //

  public pegaEnderecos(): Promise<Endereco[]> {
    return this.servicoEndereco.readAll();
  }

  public pegaCep(cep: string): Promise<Endereco> {
    return this.servicoEndereco.readOne(cep);
  }

  public pegaCepNum(cep: string, numero: number): Promise<Endereco> {
    return this.servicoEndereco.buscaCepNum(cep, numero);
  }

  public async montaEndereco(body): Promise<Endereco> {
    let enderecoNovo: Endereco = new Endereco();

    try {
      let endereco = await this.servicoEndereco.buscaCepNum(
        body.cep,
        body.numero,
      );
      if (endereco != undefined && endereco.numero == body.numero) {
        return endereco;
      } else {
        await this.montaEstado(body.estado);
        await this.montaMunicipio(body);
        let bairro: Bairro = await this.montaBairro(body);
        enderecoNovo.numero = body.numero;
        enderecoNovo.bairro = bairro;
        enderecoNovo.cep = body.cep;

        return await this.servicoEndereco.Create(enderecoNovo);
      }
    } catch (err) {
      return err;
    }
  }

  // ~~~~~~~~~ Estado ~~~~~~~~~ //

  public async montaEstado(estado): Promise<Estado> {
    let estadoNew: Estado = new Estado();
    try {
      let estadoNovo = await this.servicoEstado.readOne(estado);
      if (estadoNovo == undefined) {
        estadoNew.nome = estado;

        return await this.servicoEstado.Create(estadoNew);
      } else {
        return estadoNovo;
      }
    } catch (err) {
      return err;
    }
  }

  // // ~~~~~~~~~ Municipio ~~~~~~~~~ //

  public async montaMunicipio(body): Promise<Municipio> {
    let municipioNew: Municipio = new Municipio();
    try {
      let municipioNovo = await this.servicoMunicipio.readOne(body.municipio);
      if (municipioNovo == undefined) {
        let estado = await this.servicoEstado.readOne(body.estado);
        municipioNew.nome = body.municipio;
        municipioNew.estado = estado;

        return await this.servicoMunicipio.Create(municipioNew);
      } else {
        return municipioNovo;
      }
    } catch (err) {
      return err;
    }
  }

  // // ~~~~~~~~~ Bairro ~~~~~~~~~ //

  public async montaBairro(body): Promise<Bairro> {
    let bairroNew: Bairro = new Bairro();
    try {
      let bairroNovo = await this.servicoBairro.readOne(body.bairro);
      if (bairroNovo == undefined) {
        let municipio = await this.servicoMunicipio.readOne(body.municipio);
        bairroNew.nome = body.bairro;
        bairroNew.municipio = municipio;
        bairroNew.nome = body.bairro;
        return await this.servicoBairro.Create(bairroNew);
      } else {
        return bairroNovo;
      }
    } catch (err) {
      return err;
    }
  }

  // //~~~~~~~~~~ COMPRA ~~~~~~~~~~\\ \\
  public async buscarCompra(id: any): Promise<Compra> {
    return this.servicoCompra.readOne(id);
  }

  public async efetuarCompra(compra: any): Promise<Compra> {
    return this.servicoCompra.Create(compra);
  }

  public async buscarTodasCompras(): Promise<Compra[]> {
    return this.servicoCompra.readAll();
  }
  async montaCompra(body: any): Promise<Compra> {
    try {
      let compra = new Compra();
      compra.valorTotal = body.valorTotal;
      compra.pessoa = body.pessoa;
      compra.data = body.data;
      compra.endereco = await this.montaEndereco(body.enderecoEntrega);
      compra.pagamento = body.pagamento;
      compra.status = body.status;
      let itenscompra: ItemCompra[] = [];

      for (let ic of body.carrinho) {
        let item = new ItemCompra();
        item.produto = await this.servicoProduto.readOne(ic.produto.id);
        item.quantidade = ic.quantidade;
        item.valoratual = item.produto.valorunitario;
        itenscompra.push(await this.servicoItemCompra.Create(item));
      }
      compra.itemcompra = itenscompra;

      return await this.servicoCompra.Create(compra);
    } catch (err) {
      throw new Error(
        'Erro ao salvar compra. Verifique os parâmetros enviados.',
      );
    }
  }
  async pegaTodasCategorias(): Promise<Categoria[]> {
    return await this.servicoCaracteristicas.buscaTodasCategorias();
  }

  async pegaTodosVolumes(): Promise<Volume[]> {
    return await this.servicoCaracteristicas.buscaTodosVolumes();
  }

  async pegaTodosGeneros(): Promise<Genero[]> {
    return await this.servicoCaracteristicas.buscaTodosGeneros();
  }

  async pegaTodosMateriais(): Promise<Material[]> {
    return await this.servicoCaracteristicas.buscaTodosMateriais();
  }

  async pegaTodosTamanhos(): Promise<Tamanho[]> {
    return await this.servicoCaracteristicas.buscaTodosTamanhos();
  }
}
