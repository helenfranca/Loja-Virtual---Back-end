import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DoacaodeSangueModule } from './doacaodesangue/doacaodesangue.module';

@Module({
  imports: [DoacaodeSangueModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
