import { Hemocentro } from '../model/hemocentro.entity';
import { Doacao } from '../model/doacao.entity';
import { DoacaoService } from './doacao.service';
import { Doador } from '../model/doador.entity';
import { Observacao } from '../model/observacao.entity';

jest.mock('../service/doacao.service');

describe('DoacaoService', () => {
    let service: DoacaoService;
    let doacao: Doacao = new Doacao();
    doacao.id = 0;
    doacao.quantidade = 12;
    doacao.datadoacao = new Date().toLocaleDateString();
    doacao.doador = new Doador();
    doacao.doador.id = 0;
    doacao.hemocentro = new Hemocentro();
    doacao.observacao = new Observacao();
        
    beforeEach(() => {
        service = new DoacaoService();
      });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('Quando eu buscar por todas as demandas já criadas, receberei um array com diversos objetos demanda ', async () => {
        let retorno = await service.readAll();
        expect(retorno).toEqual([doacao,doacao]);
      });
    
    it('Ao pesquisar por uma demanda em específico receberei um objeto demanda', async () => {        
    let retorno = await service.readOne(0);
    expect(retorno).toEqual(doacao);
    });

    it('Ao gerar o relatório de número de demandas por tipo irei receber um array com o resultado', async () => {
    let retorno = await service.getDoacoesDoador(0);
    expect(retorno).toEqual([doacao,doacao,doacao]);
    });

    it('Ao criar uma demanda receberei de volta o objeto criado', async () => {
    let retorno = await service.Create(doacao);
    expect(retorno).toEqual(doacao);
    });

    it('Ao excluir uma demanda deverei receber de volta o objeto que acabei de excluir', async () => {
    let retorno = await service.Drop(doacao);
    expect(retorno).toEqual(doacao);
    });

    it('Ao alterar uma demanda deverei receber de volta o objeto alterado', async () => {
    let retorno = await service.Update(doacao);
    expect(retorno).toEqual(doacao);
    });
});