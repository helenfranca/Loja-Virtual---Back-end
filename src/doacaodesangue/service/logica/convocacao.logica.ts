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
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: { rejectUnauthorized: false },
});

const mailOptions = {
  from: '"Tuntum - Doação de Sangue"<tuntumdoacaodesangue@gmail.com>',
  to: '',
  subject: 'Ei, doador! Você tem uma nova missão!',
  text: 'Este é um teste do Tuntum <3!',
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

    let emails = [];
    doadoresAptos.forEach(element => {
      emails.push(element.email);
    });

    emails.forEach(element => {
      let i = 0;
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
