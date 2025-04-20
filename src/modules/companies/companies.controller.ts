import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CrudQueryController } from 'src/shared/crud/controllers/crud-query.controller';
import { CompanyEntity } from 'src/database/schemas/companies/companies.entity';
import {
  CompanyDto,
  CreateCompanyDTO,
  UpdateCompanyDTO,
} from 'src/database/schemas/companies/companies.dto';
import { CompanyService } from './companies.service';

// Criamos o controlador base usando a função factory
const CompanyControllerBase = CrudQueryController<
  CompanyEntity,
  typeof CreateCompanyDTO,
  typeof UpdateCompanyDTO,
  typeof CompanyDto
>('companies', CreateCompanyDTO, UpdateCompanyDTO, CompanyDto);

@ApiTags('Empresas')
@Controller('companies')
export class CompanyController extends CompanyControllerBase {
  constructor(readonly companyService: CompanyService) {
    super(companyService);
  }
}
