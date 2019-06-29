import { DemandaService } from './demanda.service';
import { Demanda, StatusEnum } from '../model/demanda.entity';
import { Hemocentro } from '../model/hemocentro.entity';
import { TipoSanguineo } from '../model/tiposanguineo.entity';

jest.mock('../service/demanda.service');

describe('DemandaService', () => {
    let service: DemandaService;
    let demanda: Demanda = new Demanda();
        demanda.id = 0;
        demanda.hemocentro = new Hemocentro();
        demanda.status = StatusEnum.Aberta;
        demanda.tiposanguineo = new TipoSanguineo();
        
    beforeEach(() => {
        service = new DemandaService();
      });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('Quando eu buscar por todas as demandas já criadas, receberei um array com diversos objetos demanda ', async () => {
        let retorno = await service.readAll();
        expect(retorno).toEqual([demanda,demanda]);
      });
    
      it('Ao pesquisar por uma demanda em específico receberei um objeto demanda', async () => {        
        let retorno = await service.readOne(0);
        expect(retorno).toEqual(demanda);
      });
    
      it('Ao gerar o relatório de número de demandas por tipo irei receber um array com o resultado', async () => {
        let retorno = await service.demandaTipo();
        let expected = [{"count": 21233, "tipofator": "O-"}, {"count": 9083, "tipofator": "A+"}];
        expect(retorno).toEqual(expected);
      });
    
      it('Ao criar uma demanda receberei de volta o objeto criado', async () => {
        let retorno = await service.Create(demanda);
        expect(retorno).toEqual(demanda);
      });

      it('Ao excluir uma demanda deverei receber de volta o objeto que acabei de excluir', async () => {
        let retorno = await service.Drop(demanda);
        expect(retorno).toEqual(demanda);
      });

      it('Ao alterar uma demanda deverei receber de volta o objeto alterado', async () => {
        let retorno = await service.Update(demanda);
        expect(retorno).toEqual(demanda);
      });
});