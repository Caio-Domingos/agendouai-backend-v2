import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerDocumentOptions } from '@nestjs/swagger/dist/interfaces';
import {
  AuthResponseDto,
  RefreshTokenDto,
  UserResponseDto,
} from '../auth/dto/response.dto';
import {
  MigrationDto,
  MigrationsRunResponseDto,
  MigrationSuccessDto,
  PendingMigrationsDto,
  MigrationHistoryDto,
} from '../database/migrations/dto/migration-response.dto';
import { SeedSuccessDto } from '../database/seeds/dto/seed-response.dto';
import { PaginatedResponseDto } from '../shared/crud/dto/paginated-response.dto';

/**
 * Configures Swagger documentation for the application
 */
export function setupSwagger(
  app: INestApplication,
  appName: string,
  apiVersion: string,
): void {
  const swaggerConfig = new DocumentBuilder()
    .setTitle(appName)
    .setDescription('API Documentation')
    .setVersion(apiVersion)
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        in: 'header',
      },
      'JWT',
    )
    .addTag('auth', 'Authentication endpoints')
    .addTag('admin', 'Admin only endpoints')
    .build();

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
    deepScanRoutes: true,
    // Aqui registramos explicitamente todos os DTOs que usamos como respostas
    extraModels: [
      AuthResponseDto,
      UserResponseDto,
      RefreshTokenDto,
      MigrationDto,
      MigrationsRunResponseDto,
      MigrationSuccessDto,
      PendingMigrationsDto,
      MigrationHistoryDto,
      SeedSuccessDto,
      PaginatedResponseDto,
    ],
  };

  const document = SwaggerModule.createDocument(app, swaggerConfig, options);

  // Customize Swagger UI options
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
      docExpansion: 'none',
    },
    customSiteTitle: `${appName} - API Documentation`,
  });
}
