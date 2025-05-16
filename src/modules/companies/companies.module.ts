import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { CompaniesRepository } from 'src/database/schemas/companies/companies.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesEntity } from 'src/database/schemas/companies/companies.entity';
import { AvailabilitiesModule } from '../availabilities/availabilities.module';

@Module({
  exports: [CompaniesService],
  controllers: [CompaniesController],
  providers: [CompaniesService, CompaniesRepository],
  imports: [TypeOrmModule.forFeature([CompaniesEntity]), AvailabilitiesModule],
})
export class CompaniesModule {}
