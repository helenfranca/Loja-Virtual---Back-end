import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('Api do projeto Doação de Sangue')
    .setDescription('Rotas referentes ao trabalho')
    .setVersion('1.0')
    // .addTag('Doaçao de Sangue')
    .setSchemes('https', 'http')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
  const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:4200',
    'http://localhost',
    'https://tuntum.herokuapp.com',
  ];
  const optionsCors: cors.CorsOptions = {
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'X-Access-Token',
    ],
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: allowedOrigins,
    preflightContinue: false,
  };
  app.use(cors(optionsCors));
  await app.listen(parseInt(process.env.PORT) || 3000);
}
bootstrap();
