import { NestFactory } from '@nestjs/core';
import { SeedsService } from './seeds.service';
import { Logger } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import appConfig from '../../config/app.config';
import databaseConfig from '../../config/database.config';
import authConfig from '../../config/auth.config';

import { UserEntity } from '../schemas/users/users.entity';
import { PeopleEntity } from '../schemas/people/people.entity';
import { CompaniesEntity } from '../schemas/companies/companies.entity';
import { CompanyCategoriesEntity } from '../schemas/company-categories/company-categories.entity';
import { PlansEntity } from '../schemas/plans/plans.entity';
import { CompanySubscriptionHistoryEntity } from '../schemas/company-subscription-history/company-subscription-history.entity';
import { SpacesEntity } from '../schemas/spaces/spaces.entity';
import { SpaceManagersEntity } from '../schemas/space-managers/space-managers.entity';
import { BookingEntity } from '../schemas/bookings/bookings.entity';
import { BookingStatusHistoryEntity } from '../schemas/booking-status-history/booking-status-history.entity';
import { AvailabilitiesEntity } from '../schemas/availabilities/availabilities.entity';

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
      schema: process.env.DATABASE_SCHEMA || 'public',
      entities: [
        UserEntity,
        PeopleEntity,
        CompaniesEntity,
        CompanyCategoriesEntity,
        PlansEntity,
        CompanySubscriptionHistoryEntity,
        SpacesEntity,
        SpaceManagersEntity,
        BookingEntity,
        BookingStatusHistoryEntity,
        AvailabilitiesEntity,
      ],
      synchronize: false,
    }),
    // Importar as entidades necessárias
    TypeOrmModule.forFeature([
      UserEntity,
      PeopleEntity,
      CompaniesEntity,
      CompanyCategoriesEntity,
      PlansEntity,
      CompanySubscriptionHistoryEntity,
      SpacesEntity,
      SpaceManagersEntity,
      BookingEntity,
      BookingStatusHistoryEntity,
      AvailabilitiesEntity,
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

    await seedsService.seedInitialAdmin();

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
