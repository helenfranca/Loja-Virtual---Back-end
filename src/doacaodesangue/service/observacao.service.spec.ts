import { ObservacaoService } from './observacao.service';
import { Observacao } from '../model/observacao.entity';
import { Doacao } from '../model/doacao.entity';

jest.mock('../service/observacao.service');

describe('ObservacaoService', () => {
    let service: ObservacaoService;
    let observacao = new Observacao();
    observacao.id = 0;
    observacao.descricao = "Tudo certo!";
    observacao.doacao = new Doacao();

    beforeEach(() => {
        service = new ObservacaoService();
        });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('Quando eu buscar por todas as observações já cadastradas, receberei um array com todas as observações', async () => {
    let retorno = await service.readAll();
    expect(retorno).toEqual([observacao,observacao]);
    });

    it('Ao pesquisar por uma observação em específico receberei o obejto observação', async () => {        
    let retorno = await service.readOne(0);
    expect(retorno).toEqual(observacao);
    });

    it('Ao criar uma observação receberei de volta o objeto criado', async () => {
    let retorno = await service.Create(observacao);
    expect(retorno).toEqual(observacao);
    });

    it('Ao excluir uma observação deverei receber de volta o objeto que acabei de excluir', async () => {
    let retorno = await service.Drop(observacao);
    expect(retorno).toEqual(observacao);
    });

    it('Ao alterar uma observaçã deverei receber de volta o objeto alterado', async () => {
    let retorno = await service.Update(observacao);
    expect(retorno).toEqual(observacao);
    });
});