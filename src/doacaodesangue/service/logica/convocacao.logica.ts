import { Injectable } from '@nestjs/common';
import { Tuntum } from './tuntum.logica';
import { Demanda } from 'src/doacaodesangue/model/demanda.entity';
import { MontaEmail } from './email';

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  host: 'smtp.gmail.com',
  port: 25,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'tuntumdoacaodesangue@gmail.com',
    pass: 'tuntum123',
  },
  tls: { rejectUnauthorized: false },
});

const mailOptions = {
  from: '"Tuntum - Doação de Sangue" <tuntumdoacaodesangue@gmail.com>',
  to: '',
  subject: 'Ei, doador! Você tem uma nova missão!',
  html: '',
};

@Injectable()
export class ConvocacaoLogica {
  constructor(
    private readonly logicaTuntum: Tuntum,
    private readonly montaEmail: MontaEmail,
  ) {}
  async convocar(demanda: Demanda) {
    let doadoresAptos = await this.logicaTuntum.aptoConvocar(
      demanda.tiposanguineo,
    );

    this.email(doadoresAptos, demanda);
  }

  email(doadoresAptos, demanda) {
    let emails = [];
    doadoresAptos.forEach(element => {
      emails.push(element.email);
    });
    let i = 0;
    emails.forEach(element => {
      mailOptions.to = element;
      let html = this.montaEmail.montaHtml(
        doadoresAptos[i].nome,
        demanda.hemocentro.nome,
        demanda.tiposanguineo.tipofator,
      );
      mailOptions.html = html;
      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log('Caiu no erro: ' + error);
        } else {
          console.log('Email enviado: ' + info.response);
        }
      });
      i = i + 1;
    });
  }
}
