import { PessoaService } from './pessoa.service';
import { SexoEnum, Pessoa } from '../model/pessoa.entity';
import { Doador } from '../model/doador.entity';
import { Compra } from '../model/compra.entity';
import { Endereco } from '../model/endereco.entity';

jest.mock('../service/pessoa.service');

describe('PessoaService', () => {
    let service: PessoaService;
    let user1: Pessoa = new Pessoa();
    user1.id = 0;
    user1.cpf = '553.508.997-40';
    user1.datanascimento = new Date('October 13, 1996 05:35:32');
    user1.doador = new Doador();
    user1.email = 'tomasluanvicentedrumond_@econe.com.br';
    user1.nome = 'Tomás Luan';
    user1.sobrenome = 'Vicente Drumond';
    user1.telefone = 2725052279;
    user1.status = true;
    user1.sexo = SexoEnum.Masculino;
    user1.senha = 'lSsH4Cq70m';
    user1.compra = [new Compra()];
    user1.enderecos =  [new Endereco()];
        
    beforeEach(() => {
        service = new PessoaService();
      });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('Ao chamar readAll ela retornará um array com todos as pessoas cadastradas', async () => {
        let retorno = await service.readAll();
        expect(retorno).toEqual([user1,user1]);
      });
    
      it('Ao chamar readOne, passando um inteiro como parâmetro, ela retornará uma pessoa de id correspondente', async () => {        
        let retorno = await service.readOne(0);
        expect(retorno).toEqual(user1);
      });
    
      it('Ao buscar um email e senha será retornado um objeto com email e senha correspondente', async () => {
        let retorno = await service.findByEmail('tomasluanvicentedrumond_@econe.com.br',
        'lSsH4Cq70m');
        expect(retorno).toEqual(user1);
      });
    
      it('Ao chamar create ela retornará o objeto criado', async () => {
        let retorno = await service.Create(user1);
        expect(retorno).toEqual(user1);
      });
      it ('Quando eu buscar uma pessoa pelo CPF receberei de volta um objeto pessoa com CPF correspondente', async() => {
        let body = {cpf: '553.508.997-40'};
        let retorno = await service.pessoaCpf(body);
        expect(retorno).toEqual(user1);
      });
});