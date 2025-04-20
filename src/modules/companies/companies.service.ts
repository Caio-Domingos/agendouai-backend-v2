import { Injectable } from '@nestjs/common';
import { CrudQueryService } from 'src/shared/crud/services/crud-query.service';
import { CompanyEntity } from 'src/database/schemas/companies/companies.entity';
import {
  CreateCompanyDTO,
  UpdateCompanyDTO,
} from 'src/database/schemas/companies/companies.dto';
import { CompanyRepository } from 'src/database/schemas/companies/companies.repository';

@Injectable()
export class CompanyService extends CrudQueryService<
  CompanyEntity,
  CreateCompanyDTO,
  UpdateCompanyDTO
> {
  constructor(private companyRepository: CompanyRepository) {
    super(companyRepository);
  }
}
