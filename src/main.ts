import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

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

  // Aplica configurações do app
  const appConfig = configService.get('app');
  const port = appConfig.port;
  const globalPrefix = `${appConfig.apiPrefix}/${appConfig.apiVersion}`;

  // Configuração do prefixo global para rotas
  app.setGlobalPrefix(globalPrefix);

  // Configuração de CORS
  app.enableCors({
    origin: appConfig.corsAllowedOrigins,
    credentials: true,
  });

  await app.listen(port);
  console.log(`Application is running on: ${appConfig.appUrl}/${globalPrefix}`);
}
bootstrap();
