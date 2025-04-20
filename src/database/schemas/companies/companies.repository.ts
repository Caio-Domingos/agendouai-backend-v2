import { Request } from 'express';
import { CrudQueryRepository } from 'src/shared/database/repositories/crud-query.repository';
import { DataSource } from 'typeorm';

import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';

import { CreateCompanyDTO, UpdateCompanyDTO } from './companies.dto';
import { CompanyEntity } from './companies.entity';

@Injectable()
export class CompanyRepository extends CrudQueryRepository<
  CompanyEntity,
  CreateCompanyDTO,
  UpdateCompanyDTO
> {
  constructor(dataSource: DataSource, @Inject(REQUEST) request: Request) {
    super(dataSource, request, CompanyEntity);
  }
}
