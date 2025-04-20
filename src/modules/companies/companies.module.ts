import { Module } from '@nestjs/common';
import { CompanyService } from './companies.service';
import { CompanyController } from './companies.controller';
import { CompanyRepository } from 'src/database/schemas/companies/companies.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyEntity } from 'src/database/schemas/companies/companies.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyEntity])],
  exports: [CompanyService],
  controllers: [CompanyController],
  providers: [CompanyService, CompanyRepository],
})
export class CompanyModule {}
