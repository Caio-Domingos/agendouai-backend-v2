import { Injectable } from '@nestjs/common';
import { CrudQueryService } from 'src/shared/crud/services/crud-query.service';
import { CompanyCategoriesEntity } from 'src/database/schemas/company-categories/company-categories.entity';
import {
  CreateCompanyCategoriesDTO,
  UpdateCompanyCategoriesDTO,
} from 'src/database/schemas/company-categories/company-categories.dto';
import { CompanyCategoriesRepository } from 'src/database/schemas/company-categories/company-categories.repository';

@Injectable()
export class CompanyCategoriesService extends CrudQueryService<
  CompanyCategoriesEntity,
  CreateCompanyCategoriesDTO,
  UpdateCompanyCategoriesDTO
> {
  constructor(
    private companyCategoriesRepository: CompanyCategoriesRepository,
  ) {
    super(companyCategoriesRepository);
  }
}
