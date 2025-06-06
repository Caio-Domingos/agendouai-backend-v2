import { CrudQueryRepository } from 'src/shared/database/repositories/crud-query.repository';
import { DataSource } from 'typeorm';
import { CompanyCategoriesEntity } from './company-categories.entity';
import {
  CreateCompanyCategoriesDTO,
  UpdateCompanyCategoriesDTO,
} from './company-categories.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CompanyCategoriesRepository extends CrudQueryRepository<
  CompanyCategoriesEntity,
  CreateCompanyCategoriesDTO,
  UpdateCompanyCategoriesDTO
> {
  constructor(dataSource: DataSource) {
    super(dataSource, CompanyCategoriesEntity);
  }
}
