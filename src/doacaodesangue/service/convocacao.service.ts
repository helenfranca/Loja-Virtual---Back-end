import { Injectable } from '@nestjs/common';

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'gmail.com',
  port: 25,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'helenfranca93@gmail.com',
    pass: 'anelehhelena',
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
