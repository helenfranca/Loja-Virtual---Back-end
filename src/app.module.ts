import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DoacaodeSangueModule } from './doacaodesangue/doacaodesangue.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DoacaodeSangueModule,AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
