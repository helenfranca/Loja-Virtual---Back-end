import { Injectable } from '@nestjs/common';
import { Demanda, StatusEnum } from '../model/demanda.entity';
import { genericInterface } from './interface/generic.interface';
import { Hemocentro } from '../model/hemocentro.entity';
import { TipoSanguineoService } from './tiposanguineo.service';
import { DoadorService } from './doador.service';
import { Doador } from '../model/doador.entity';
import { ConvocacaoService } from './convocacao.service';

@Injectable()
export class DemandaService implements genericInterface<Demanda> {
  readAll(): Promise<Demanda[]> {
    return Demanda.createQueryBuilder('demanda')
      .select(
        'demanda.id, demanda.status, hemocentro.nome, tiposanguineo.tipofator',
      )
      .innerJoin('demanda.hemocentro', 'hemocentro')
      .innerJoin('demanda.tiposanguineo', 'tiposanguineo')
      .getRawMany();
  }
  vnjksdjvnvsndvjsvidjn;

  readOne(id: number): Promise<Demanda> {
    return Demanda.createQueryBuilder('demanda')
      .select(
        'demanda.id, demanda.status, hemocentro.nome, tiposanguineo.tipofator',
      )
      .innerJoin('demanda.hemocentro', 'hemocentro')
      .innerJoin('demanda.tiposanguineo', 'tiposanguineo')
      .where('demanda.id = :name', { name: id })
      .getRawOne();
  }

  async relatorio() {
    let demanda = await Demanda.createQueryBuilder('demanda')
      .select('count(demanda.id), tiposanguineo.tipofator')
      .innerJoin('demanda.tiposanguineo', 'tiposanguineo')
      .groupBy('tiposanguineo.tipofator')
      .getRawMany();

    return demanda;
  }

  async Create(body: any): Promise<Demanda> {
    let demanda: Demanda = new Demanda();
    try {
      let hemocentro = await Hemocentro.findOne({ id: body.idhemocentro });
      let tipo = new TipoSanguineoService();
      let tiposangue = await tipo.buscaOne(body.tiposanguineo);

      demanda.status = StatusEnum.Aberta;
      demanda.data = new Date().toLocaleDateString();
      demanda.hemocentro = hemocentro;
      demanda.tiposanguineo = tiposangue;
      let convocar = await Demanda.save(demanda);
      if (convocar != undefined) {
        let doadorService = new DoadorService();
        let doadores: Doador[] = await doadorService.aptosConvocacao(
          tiposangue,
        );
        let notificacao = new ConvocacaoService();
        notificacao.convocar(convocar, doadores);
        return convocar;
      }
    } catch (err) {
      throw new Error(
        `Erro ao salvar demanda \n Erro: ${err.name}\n Mensagem: ${
          err.message
        }\n Os parametros estao certos?`,
      );
    }
  }
  async Drop(body: any): Promise<Demanda> {
    try {
      let demanda = await Demanda.findOne({ id: body.id });
      demanda.status = StatusEnum.Fechada;
      return await Demanda.save(demanda);
    } catch (err) {
      throw new Error(
        `Erro ao apagar pessoa \n Erro: ${err.name}\n Mensagem: ${
          err.message
        }\n Os parametros estao certos?`,
      );
    }
  }
  Update(body: any): Promise<Demanda> {
    throw new Error('Method not implemented.');
  }
}
