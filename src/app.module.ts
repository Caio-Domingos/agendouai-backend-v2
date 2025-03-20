import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [
    ConfigModule,
    // Outros módulos serão adicionados aqui
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
