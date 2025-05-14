import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import appConfig from '../../config/app.config';
import databaseConfig from '../../config/database.config';
import authConfig from '../../config/auth.config';
import { DatabaseCleanService } from './database-clean.service';

// Criar um módulo especial apenas para executar a limpeza
@Module({
  imports: [
    // Importar configurações
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, authConfig],
      envFilePath: ['.env.local', '.env'],
    }),
    // Configurar TypeORM com conexão direta
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT || '5432', 10),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [], // Especificar diretamente as entidades
      synchronize: false,
    }),
  ],
  providers: [DatabaseCleanService],
})
class CleanExecutorModule {}

async function bootstrap() {
  const logger = new Logger('DatabaseCleaner');

  try {
    logger.warn('Iniciando limpeza do banco de dados...');
    logger.warn(
      'ATENÇÃO: Todos os dados serão removidos! (exceto histórico de migrations)',
    );

    // Confirmar com o usuário (apenas se não estiver em CI/CD)
    if (process.env.CI !== 'true') {
      logger.warn(
        'Pressione Ctrl+C para cancelar ou aguarde 5 segundos para continuar...',
      );
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }

    // Cria uma aplicação NestJS com o módulo específico para limpeza
    const app = await NestFactory.createApplicationContext(CleanExecutorModule);

    // Obtém o serviço de limpeza
    const cleanService = app.get(DatabaseCleanService);

    // Executa a limpeza
    const result = await cleanService.cleanDatabase();

    if (result.success) {
      logger.log(result.message);
      logger.log('Banco de dados limpo com sucesso!');
    } else {
      logger.error(result.message);
    }

    // Encerra a aplicação
    await app.close();
    process.exit(result.success ? 0 : 1);
  } catch (error) {
    logger.error('Erro ao limpar banco de dados:', error);
    process.exit(1);
  }
}

// Verifica se o script está sendo executado diretamente
if (require.main === module) {
  bootstrap();
}
