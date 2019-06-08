import { Hemocentro } from '../model/hemocentro.entity';
import { Funcionamento } from '../model/funcionamento.entity';
import { HemocentroService } from './hemocentro.service';
import { TipoSanguineoEnum } from '../model/Enum';

jest.mock('../service/hemocentro.service');

describe('ObservacaoService', () => {
    let service: HemocentroService;
    let hemo = new Hemocentro();
    hemo.doacao = [];
    hemo.email = 'hemo@hemo.gov.es.br';
    hemo.funcionamento = [new Funcionamento()];
    hemo.id = 0;
    hemo.nome = "HemoES";
    hemo.senha = "HemoPass";
    hemo.status = true;
    hemo.telefone = '02732145678';
    hemo.cnes = "1232313";
    hemo.demanda = [];

    beforeEach(() => {
        service = new HemocentroService();
        });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('Quando eu buscar por todas os hemocentros já cadastrados, receberei um array com todas os hemocentros', async () => {
    let retorno = await service.readAll();
    expect(retorno).toEqual([hemo,hemo]);
    });

    it('Ao pesquisar por um hemocentro em específico receberei o obejto hemocentro', async () => {        
    let retorno = await service.readOne(0);
    expect(retorno).toEqual(hemo);
    });

    it('Ao criar um hemocentro receberei de volta o objeto criado', async () => {
    let retorno = await service.Create(hemo);
    expect(retorno).toEqual(hemo);
    });

    it('Ao excluir um hemocentro deverei receber de volta o objeto que acabei de excluir', async () => {
    let retorno = await service.Drop(hemo);
    expect(retorno).toEqual(hemo);
    });

    it('Ao alterar um hemocentro deverei receber de volta o objeto alterado', async () => {
    let retorno = await service.Update(hemo);
    expect(retorno).toEqual(hemo);
    });
    it('Ao gerar o relatório de demandas do hemocentro por tipo sanguineo', async() => {
        let expected = [{qtddemanda: 234, hemocentro:"HemoCap", tiposanguineo: TipoSanguineoEnum.Bpos},
                        {qtddemanda: 23, hemocentro:"Hemocentro", tiposanguineo: TipoSanguineoEnum.Apos}];
        expect(expected).toEqual(await service.hemocentroDemanda());
    });
    it('Quando eu buscar por um hemocentro em específico, eu receberei de volta os dados deste hemocentro', async() => {
        expect(hemo).toEqual(await service.hemocentro({id:0}));
    });
});