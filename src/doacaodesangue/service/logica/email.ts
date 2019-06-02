export class MontaEmail {
  constructor() {}
  public montaHtml(nome: string, hemocentro: string, tiposangue: string) {
    return (
      "<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>" +
      "<html xmlns='http://www.w3.org/1999/xhtml'>" +
      '<head>' +
      "<meta http-equiv='Content-Type' content='text/html; charset=UTF-8' />" +
      '<title>Email Convocação</title>' +
      "<meta name='viewport' content='width=device-width, initial-scale=1.0'/>" +
      '</head>' +
      "<body style='margin: 0; padding: 0;'>" +
      "<table align='center' bgcolor='#9CDDB2' border='0' >" +
      '<tr>' +
      "<td align='center'style='padding: 40px 0 10px 0;'>" +
      "<img src='https://github.com/helenfranca/Doacao_de_Sangue/blob/master/imagemTuntum.png?raw=true'/width='250' height='150' >" +
      '</tr><tr></td>' +
      "<td align='center'><h3>Olá, " +
      nome +
      '!</h3></td>' +
      '</tr>' +
      "<tr><td align='center'><br>Você tem uma nova chance de salvar até 4 vidas. Não é o máximo?!<br>" +
      'O ' +
      hemocentro +
      ' está precisando do tipo sanguíneo ' +
      tiposangue +
      ', que também é o seu.<br> Por favor, se dirija ao endereço do Hemocentro ' +
      hemocentro +
      ' o mais depressa possível e realize a sua doação.<br><br> <h4>A equipe Tuntum agradece!</h4></td>' +
      '</tr>' +
      '</table>' +
      '</body>' +
      '</html>'
    );
  }
}
