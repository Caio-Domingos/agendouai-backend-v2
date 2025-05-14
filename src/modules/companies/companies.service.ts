import { Injectable } from '@nestjs/common';
import { CrudQueryService } from 'src/shared/crud/services/crud-query.service';
import { CompaniesEntity } from 'src/database/schemas/companies/companies.entity';
import {
  CreateCompaniesDTO,
  UpdateCompaniesDTO,
} from 'src/database/schemas/companies/companies.dto';
import { CompaniesRepository } from 'src/database/schemas/companies/companies.repository';

@Injectable()
export class CompaniesService extends CrudQueryService<
  CompaniesEntity,
  CreateCompaniesDTO,
  UpdateCompaniesDTO
> {
  constructor(private companiesRepository: CompaniesRepository) {
    super(companiesRepository);
  }
}
