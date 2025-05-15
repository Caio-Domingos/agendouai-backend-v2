import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { setupSwagger } from './plugins/swagger-validation.plugin';
import { SeedsService } from './database/seeds/seeds.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  // Configuração global do ValidationPipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove propriedades não decoradas
      forbidNonWhitelisted: true, // Rejeita requisições com propriedades não permitidas
      transform: true, // Transforma automaticamente os dados de entrada
      transformOptions: {
        enableImplicitConversion: true, // Permite conversão implícita de tipos
      },
      stopAtFirstError: true, // Para a validação no primeiro erro (melhora performance)
    }),
  );

  // Configuração do Swagger
  const appConfig = configService.get('app');

  // Criando a configuração do Swagger
  setupSwagger(app, appConfig.name, appConfig.apiVersion);

  // Aplica configurações do app
  const port = appConfig.port;
  const globalPrefix = `${appConfig.apiPrefix}/${appConfig.apiVersion}`;

  // Configuração do prefixo global para rotas
  app.setGlobalPrefix(globalPrefix);

  // Configuração de CORS
  app.enableCors({
    origin: true, // Isso permite todas as origens
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: false,
    allowedHeaders: 'Authorization,Content-Type',
  });

  await app.init();

  // Executa seeds ao iniciar
  const seedsService = app.get(SeedsService);
  await seedsService.runAllSeeds();

  await app.listen(port);
  console.log(`Application is running on: ${appConfig.appUrl}/${globalPrefix}`);
  console.log(`Documentation is available at: ${appConfig.appUrl}/api/docs`);
}
bootstrap();
