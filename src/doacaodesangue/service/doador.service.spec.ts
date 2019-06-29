import { TipoSanguineo } from '../model/tiposanguineo.entity';
import { Doador } from '../model/doador.entity';
import { Pessoa } from '../model/pessoa.entity';
import { DoadorService } from './doador.service';

jest.mock('../service/doador.service');

describe('DoadorService', () => {
    let service: DoadorService;
    let doador = new Doador();
    doador.id = 0
    doador.malaria = true;
    doador.htlv = true;
    doador.hiv = true;
    doador.hepatitec = false;
    doador.hepatiteb = false;
    doador.hepatite11 = false;
    doador.apto = false;
    doador.doenca_chagas = true;
    doador.drogailicita = false;
    doador.tiposanguineo = new TipoSanguineo();
    doador.doacao = [];
    doador.pessoa = new Pessoa();

    beforeEach(() => {
        service = new DoadorService();
        });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('Quando eu buscar por todos os doadores já cadastrados, receberei um array com diversos doadores ', async () => {
    let retorno = await service.readAll();
    expect(retorno).toEqual([doador,doador]);
    });

    it('Ao pesquisar por um doador em específico receberei o obejto doador', async () => {        
    let retorno = await service.readOne(0);
    expect(retorno).toEqual(doador);
    });

    it('Ao gerar o relatório de número de doadores por tipo sanguineo irei receber um array com o resultado', async () => {
    let retorno = await service.doadoresTipo();
    let expected = [{qtddoador: 123, tiposanguineo:new TipoSanguineo()},
                    {qtddoador: 321, tiposanguineo:new TipoSanguineo()}];
    expect(retorno).toEqual(expected);
    });

    it('Ao criar um doador receberei de volta o objeto criado', async () => {
    let retorno = await service.Create(doador);
    expect(retorno).toEqual(doador);
    });

    it('Ao excluir um doador deverei receber de volta o objeto que acabei de excluir', async () => {
    let retorno = await service.Drop(doador);
    expect(retorno).toEqual(doador);
    });

    it('Ao alterar um doador deverei receber de volta o objeto alterado', async () => {
    let retorno = await service.Update(doador);
    expect(retorno).toEqual(doador);
    });

    it('Ao procurar por um doador a partir do id da pessoa, receberei de volta um doador', async() => {
    let retorno = await service.doador(undefined);
    expect(retorno).toEqual(doador);
    });

    it('Ao buscar todos os doadores aptos para doação, receberei um array de doadores aptos', async() => {
    expect([]).toEqual(await service.aptos());
    })
    it('Ao buscar todos os doadores aptos para doação, receberei um array de doadores aptos', async() => {
    expect([doador]).toEqual(await service.aptosConvocacaoABnegativo(1));
    })
    it('Ao buscar todos os doadores aptos para doação, receberei um array de doadores aptos', async() => {
    expect([doador]).toEqual(await service.aptosConvocacaoAnegativo(1));
    })
    it('Ao buscar todos os doadores aptos para doação, receberei um array de doadores aptos', async() => {
    expect([doador]).toEqual(await service.aptosConvocacaoApositivo(1));
    })
    it('Ao buscar todos os doadores aptos para doação, receberei um array de doadores aptos', async() => {
    expect([doador]).toEqual(await service.aptosConvocacaoBnegativo(1));
    })
    it('Ao buscar todos os doadores aptos para doação, receberei um array de doadores aptos', async() => {
    expect([doador]).toEqual(await service.aptosConvocacaoBpositivo(1));
    })
    it('Ao buscar todos os doadores aptos para doação, receberei um array de doadores aptos', async() => {
    expect([doador]).toEqual(await service.aptosConvocacaoOnegativo(1));
    })
    it('Ao buscar todos os doadores aptos para doação, receberei um array de doadores aptos', async() => {
    expect([doador]).toEqual(await service.aptosConvocacaoOpositivo(1));
    })
});