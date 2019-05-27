// ~~ Parte lógica
// Implementar metodo que vai receber a demanda e vai gerar a convocação
// Trocar nome do arquivo

import { Injectable } from '@nestjs/common';

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'gmail.com',
  port: 25,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'email',
    pass: 'senha',
  },
  tls: { rejectUnauthorized: false },
});

const mailOptions = {
  from: 'helenfranca93@gmail.com',
  to: 'helenfranca93@gmail.com',
  subject: 'E-mail enviado usando Node!',
  text: 'Bem fácil, não? ;)',
};

@Injectable()
export class ConvocacaoService {
  convocar(demanda, doadores) {
    // let emails = [];
    // doadores.forEach(element => {
    //   emails.push(doadores.email);
    // });

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log('Caiu no erro' + error);
      } else {
        console.log('Email enviado: ' + info.response);
      }
    });
  }
}
