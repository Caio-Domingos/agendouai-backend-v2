import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

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
