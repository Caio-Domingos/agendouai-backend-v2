import { NestFactory } from '@nestjs/core';
import { SeedsModule } from './seeds.module';
import { SeedsService } from './seeds.service';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Seeds');

  try {
    logger.log('Iniciando a execução das seeds...');

    // Cria uma aplicação NestJS específica para seeds
    const app = await NestFactory.createApplicationContext(SeedsModule);

    // Obtém o serviço de seeds
    const seedsService = app.get(SeedsService);

    // Executa todas as seeds
    await seedsService.runAllSeeds();

    logger.log('Seeds executadas com sucesso!');

    // Encerra a aplicação
    await app.close();
    process.exit(0);
  } catch (error) {
    logger.error('Erro ao executar seeds:', error);
    process.exit(1);
  }
}

bootstrap();
