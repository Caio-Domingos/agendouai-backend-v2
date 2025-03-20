import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './shared/database/database.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    // Outros módulos serão adicionados aqui
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
