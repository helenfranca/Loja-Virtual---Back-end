import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { async } from 'rxjs/internal/scheduler/async';

jest.mock('../src/doacaodesangue/service/produto.service.ts');

const feature = loadFeature('./test/features/produto.feature');

defineFeature(feature, test => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  test('O usuário deseja pesquisar os produtos pela barra de busca', ({
    given,
    when,
    then,
  }) => {
    let texto: string;
    let resposta: any;
    given('que foi informado o texto', () => {
      texto = 'doe';
    });

    when(
      'eu pesquisar o produto que contém o trecho do texto no nome',
      async () => {
        resposta = await request(app.getHttpServer()).get(
          '/produto/busca/' + texto,
        );
      },
    );

    then('devo retornar um vetor com todos os produtos', () => {
      expect(resposta.text).toEqual(
        '[{"id":4,"nome":"Doe sangue, deo vida!","quantidade":40,"descricao":"","valorunitario":29.9,"categoria":"Botton","tamanho":"M","volume":"Não Possui","material":"Plastico","genero":"Unissex"}]',
      );
    });
  });

  test('O usuário deseja filtrar os produtos por categoria', ({
    given,
    when,
    then,
  }) => {
    let categoria: string;
    let resposta: any;
    given('que foi informado uma categoria de produtos', () => {
      categoria = 'camisas';
    });

    when('eu pesquisar a categoria', async () => {
      resposta = await request(app.getHttpServer()).get('/' + categoria);
    });

    then(
      'devo retornar um vetor com todos os produtos da categoria solicitada',
      () => {
        expect(resposta.text).toEqual(
          '[{"id":1,"nome":"Sou um herói!","quantidade":10,"descricao":"T-shirt","valorunitario":15.5,"categoria":"Camisa","tamanho":"GG","volume":"Não Possui","material":"Malha","genero":"Feminino"},{"id":2,"nome":"Compartilhando sangue bom","quantidade":30,"descricao":"","valorunitario":19.9,"categoria":"Camisa","tamanho":"P","volume":"Não Possui","material":"Algodão","genero":"Masculino"}]',
        );
      },
    );
  });

  test('O usuário deseja ter acesso ao catálogo', ({ given, when, then }) => {
    let produto: string;
    let resposta: any;
    given('que foi solicitado ver todos os produtos', () => {
      produto = 'produto';
    });

    when('eu pesquisar', async () => {
      resposta = await request(app.getHttpServer()).get('/' + produto);
    });

    then('devo retornar um vetor com todos os produtos da loja', () => {
      expect(resposta.text).toEqual(
        '[{"id":2,"nome":"Compartilhando sangue bom","quantidade":30,"descricao":"","valorunitario":19.9,"categoria":"Camisa","tamanho":"P","volume":"Não Possui","material":"Algodão","genero":"Masculino"},{"id":1,"nome":"Sou um herói!","quantidade":10,"descricao":"T-shirt","valorunitario":15.5,"categoria":"Camisa","tamanho":"GG","volume":"Não Possui","material":"Malha","genero":"Feminino"},{"id":3,"nome":"Sangue bom","quantidade":40,"descricao":"","valorunitario":29.9,"categoria":"Caneca","tamanho":"Não especificado","volume":"300","material":"Porcelana","genero":"Unissex"},{"id":4,"nome":"Doe sangue, deo vida!","quantidade":40,"descricao":"","valorunitario":29.9,"categoria":"Botton","tamanho":"M","volume":"Não Possui","material":"Plastico","genero":"Unissex"}]',
      );
    });
  });

  test('O usuário deseja ter acesso a um unico produto', ({
    given,
    when,
    then,
  }) => {
    let codbd: number;
    let resposta: any;
    given('que foi informado o id do produto', () => {
      codbd = 2;
    });

    when('eu pesquisar pelo id', async () => {
      resposta = await request(app.getHttpServer()).get('/produto/' + codbd);
    });

    then('devo retornar um vetor com todas as informações do produto', () => {
      expect(resposta.text).toEqual(
        '{"id":2,"nome":"Compartilhando sangue bom","descricao":"","quantidade":30,"valorunitario":19.9}',
      );
    });
  });

  test('O administrador deseja cadastrar um novo produto', ({
    given,
    when,
    then,
  }) => {
    let produto: {};
    let resposta: any;
    given('que foi informado todos os dados referentes ao produto', () => {
      produto = {
        nome: 'Doe sangue!',
        quantidade: 40,
        descricao: '',
        valorunitario: '29.90',
        idcategoria: '3',
        idmaterial: '2',
        idvolume: '8',
        idtamanho: '2',
        idgenero: '3',
      };
    });

    when('enviar os dados', async () => {
      resposta = await request(app.getHttpServer())
        .post('/produto/')
        .send(produto);
    });

    then('devo retornar um vetor com o produto criado', () => {
      console.log(resposta.text);
      expect(resposta.text).toEqual(
        '{"categoria": "Botton", "descricao": "", "genero": "Unissex", "id": 4, "material": "Plastico", "nome": "Doe sangue!", "quantidade": 40, "tamanho": "M", "valorunitario": 29.9, "volume": "Não Possui"}',
      );
    });
  });
});
