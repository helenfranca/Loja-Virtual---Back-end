
import { Module, CacheModule } from '@nestjs/common';
import { PessoaService } from 'src/doacaodesangue/service/pessoa.service';
import { databaseProviders } from 'src/doacaodesangue/database/database.providers';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';

const modelProvider = [...databaseProviders];

const modelService = [
  PessoaService,
  AuthService
];

const modelController = [
  AuthController,
];
require('dotenv').config();
@Module({
    imports: [
      CacheModule.register({
        ttl: 10,
        max: 10,
      }),
      JwtModule.register({
        secretOrPrivateKey: process.env.PRIVATE_KEY
    })
    ],
    providers: [...modelProvider, ...modelService],
    controllers: [...modelController]
  })
export class AuthModule {}