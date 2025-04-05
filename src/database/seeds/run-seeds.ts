import { NestFactory } from '@nestjs/core';
import { SeedsService } from './seeds.service';
import { Logger } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import appConfig from '../../config/app.config';
import databaseConfig from '../../config/database.config';
import authConfig from '../../config/auth.config';
import { UserEntity } from '../schemas/user/user.entity';
import { PageQuestionEntity } from '../schemas/page-question/page-question.entity';
import { PageEntity } from '../schemas/pages/pages.entity';
import { QuestionnaireEntity } from '../schemas/questionnaires/questionnaires.entity';
import { QuestionEntity } from '../schemas/questions/questions.entity';
import { AlertEntity } from '../schemas/alerts/alerts.entity';
import { AnswerEntity } from '../schemas/answers/answers.entity';
import { SubmissionEntity } from '../schemas/submissions/submissions.entity';

// Criar um módulo especial apenas para executar as seeds
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
      entities: [
        UserEntity,
        QuestionEntity,
        PageEntity,
        PageQuestionEntity,
        QuestionnaireEntity,
        SubmissionEntity,
        AnswerEntity,
        AlertEntity,
      ], // Especificar diretamente as entidades
      synchronize: false,
    }),
    // Importar as entidades necessárias
    TypeOrmModule.forFeature([
      UserEntity,
      QuestionEntity,
      PageEntity,
      PageQuestionEntity,
      QuestionnaireEntity,
      SubmissionEntity,
      AnswerEntity,
      AlertEntity,
    ]),
  ],
  providers: [SeedsService],
})
class SeedExecutorModule {}

async function bootstrap() {
  const logger = new Logger('Seeds');

  try {
    logger.log('Iniciando a execução das seeds...');

    // Cria uma aplicação NestJS com o módulo específico para seeds
    const app = await NestFactory.createApplicationContext(SeedExecutorModule);

    // Obtém o serviço de seeds
    const seedsService = app.get(SeedsService);

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
