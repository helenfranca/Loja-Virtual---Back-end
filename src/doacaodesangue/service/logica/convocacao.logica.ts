import { Injectable } from '@nestjs/common';
import { Tuntum } from './tuntum.logica';
import { Demanda } from 'src/doacaodesangue/model/demanda.entity';

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
  from: 'Tuntum - Doação de Sangue',
  to: '',
  subject: 'E-mail enviado usando Node!',
  text: 'Teste um a um ;)',
};

@Injectable()
export class ConvocacaoLogica {
  constructor(private readonly logicaTuntum: Tuntum) {}
  async convocar(demanda: Demanda) {
    let doadoresAptos = await this.logicaTuntum.aptoConvocar(
      demanda.tiposanguineo,
    );

    let emails = [];
    doadoresAptos.forEach(element => {
      emails.push(element.email);
    });

    emails.forEach(element => {
      mailOptions.to = element;
      console.log(mailOptions.to);
      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log('Caiu no erro: ' + error);
        } else {
          console.log('Email enviado: ' + info.response);
        }
      });
    });
  }
}
