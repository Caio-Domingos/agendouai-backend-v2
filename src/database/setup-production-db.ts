import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { MigrationsModule } from './migrations/migrations.module';
import { MigrationsService } from './migrations/migrations.service';
import { SeedsModule } from './seeds/seeds.module';
import { SeedsService } from './seeds/seeds.service';

async function bootstrap() {
  const logger = new Logger('DatabaseSetup');

  try {
    logger.log('Iniciando setup do banco de dados...');

    // 1. Executar migrations
    logger.log('Executando migrations...');
    const migrationsApp =
      await NestFactory.createApplicationContext(MigrationsModule);
    const migrationsService = migrationsApp.get(MigrationsService);
    const migrationsResult = await migrationsService.runMigrations();
    logger.log(`${migrationsResult.count} migrations executadas.`);
    await migrationsApp.close();

    // 2. Executar seeds
    logger.log('Executando seeds...');
    const seedsApp = await NestFactory.createApplicationContext(SeedsModule);
    const seedsService = seedsApp.get(SeedsService);
    await seedsService.runAllSeeds();
    logger.log('Seeds executadas com sucesso.');
    await seedsApp.close();

    logger.log('Setup do banco de dados concluído com sucesso!');
    process.exit(0);
  } catch (error) {
    logger.error('Erro ao configurar banco de dados:', error);
    process.exit(1);
  }
}

bootstrap();
