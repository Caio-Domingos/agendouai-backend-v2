import { CrudQueryRepository } from 'src/shared/database/repositories/crud-query.repository';
import { DataSource } from 'typeorm';
import { CompanyCategoriesEntity } from './company-categories.entity';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import {
  CreateCompanyCategoriesDTO,
  UpdateCompanyCategoriesDTO,
} from './company-categories.dto';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CompanyCategoriesRepository extends CrudQueryRepository<
  CompanyCategoriesEntity,
  CreateCompanyCategoriesDTO,
  UpdateCompanyCategoriesDTO
> {
  constructor(dataSource: DataSource, @Inject(REQUEST) request: Request) {
    super(dataSource, request, CompanyCategoriesEntity);
  }
}
