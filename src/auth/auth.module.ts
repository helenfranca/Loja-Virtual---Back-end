
import { Module, CacheModule } from '@nestjs/common';
import { PessoaService } from 'src/doacaodesangue/service/pessoa.service';
import { databaseProviders } from 'src/doacaodesangue/database/database.providers';
import { PessoaController } from 'src/doacaodesangue/controller/pessoa.controller';
import { JwtModule } from '@nestjs/jwt';

const modelProvider = [...databaseProviders];

const modelService = [
  PessoaService
];

const modelController = [
  PessoaController,
];

@Module({
    imports: [
      CacheModule.register({
        ttl: 10,
        max: 10,
      }),
      JwtModule.register({
        secretOrPrivateKey: 'secret12356789'
    })
    ],
    providers: [...modelProvider, ...modelService],
    controllers: [...modelController]
  })
export class AuthModule {}