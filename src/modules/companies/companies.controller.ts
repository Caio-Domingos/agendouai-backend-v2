import { Controller, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CrudQueryController } from 'src/shared/crud/controllers/crud-query.controller';
import { CompaniesEntity } from 'src/database/schemas/companies/companies.entity';
import {
  CreateCompaniesDTO,
  UpdateCompaniesDTO,
  CompaniesDto,
} from 'src/database/schemas/companies/companies.dto';
import { CompaniesService } from './companies.service';
import { TransactionInterceptor } from 'src/shared/interceptors/transaction/transaction.interceptor';

// Criamos o controlador base usando a função factory
const CompaniesControllerBase = CrudQueryController<
  CompaniesEntity,
  typeof CreateCompaniesDTO,
  typeof UpdateCompaniesDTO,
  typeof CompaniesDto
>('companies', CreateCompaniesDTO, UpdateCompaniesDTO, CompaniesDto);

@ApiTags('Empresas')
@Controller('companies')
@UseInterceptors(TransactionInterceptor)
export class CompaniesController extends CompaniesControllerBase {
  constructor(readonly companiesService: CompaniesService) {
    super(companiesService);
  }
}
