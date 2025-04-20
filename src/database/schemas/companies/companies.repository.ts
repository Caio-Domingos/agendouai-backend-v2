import { CrudQueryRepository } from 'src/shared/database/repositories/crud-query.repository';
import { DataSource } from 'typeorm';
import { CompanyEntity } from './companies.entity';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import { CreateCompanyDTO, UpdateCompanyDTO } from './companies.dto';
import { Inject, Injectable } from '@nestjs/common';

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
