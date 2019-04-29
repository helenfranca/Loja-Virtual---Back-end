import { ProdutoService } from './produto.service';

jest.mock('../service/produto.service');

describe('ProdutoService', () => {
  let service: ProdutoService;

  beforeEach(() => {
    service = new ProdutoService();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Ao chamar readAll ela retornará um array com todos os produtos', async () => {
    let retorno = await service.readAll();
    expect(retorno).toEqual([
      {
        id: 2,
        nome: 'Compartilhando sangue bom',
        quantidade: 30,
        descricao: '',
        valorunitario: 19.9,
        categoria: 'Camisa',
        tamanho: 'P',
        volume: 'Não Possui',
        material: 'Algodão',
        genero: 'Masculino',
      },
      {
        id: 1,
        nome: 'Sou um herói!',
        quantidade: 10,
        descricao: 'T-shirt',
        valorunitario: 15.5,
        categoria: 'Camisa',
        tamanho: 'GG',
        volume: 'Não Possui',
        material: 'Malha',
        genero: 'Feminino',
      },
      {
        id: 3,
        nome: 'Sangue bom',
        quantidade: 40,
        descricao: '',
        valorunitario: 29.9,
        categoria: 'Caneca',
        tamanho: 'Não especificado',
        volume: '300',
        material: 'Porcelana',
        genero: 'Unissex',
      },
      {
        id: 4,
        nome: 'Doe sangue, deo vida!',
        quantidade: 40,
        descricao: '',
        valorunitario: 29.9,
        categoria: 'Botton',
        tamanho: 'M',
        volume: 'Não Possui',
        material: 'Plastico',
        genero: 'Unissex',
      },
    ]);
  });

  it('Ao chamar readOne, passando um inteiro como parâmetro, ela retornará um array com um produto de id correspondente', async () => {
    let retorno = await service.readOne(2);
    expect(retorno).toEqual({
      id: 2,
      nome: 'Compartilhando sangue bom',
      descricao: '',
      quantidade: 30,
      valorunitario: 19.9,
    });
  });

  it('Ao chamar buscaProdutoParam ela retornará um array com todos os produtos que contém o trecho de texto informado como parametro', async () => {
    let texto = { nome: 'doe' };
    let retorno = await service.buscaProdutoParam(texto);
    expect(retorno).toEqual([
      {
        id: 4,
        nome: 'Doe sangue, deo vida!',
        quantidade: 40,
        descricao: '',
        valorunitario: 29.9,
        categoria: 'Botton',
        tamanho: 'M',
        volume: 'Não Possui',
        material: 'Plastico',
        genero: 'Unissex',
      },
    ]);
  });

  it('Ao chamar create ela retornará um json com os dados do produto criado', async () => {
    let texto = { nome: 'Doe sangue!' };
    let retorno = await service.Create(texto);
    expect(retorno).toEqual([
      {
        id: 4,
        nome: 'Doe sangue!',
        quantidade: 40,
        descricao: '',
        valorunitario: 29.9,
        categoria: 'Botton',
        tamanho: 'M',
        volume: 'Não Possui',
        material: 'Plastico',
        genero: 'Unissex',
      },
    ]);
  });
});
