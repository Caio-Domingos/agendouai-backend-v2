import { CrudQueryRepository } from 'src/shared/database/repositories/crud-query.repository';
import { DataSource } from 'typeorm';
import { CompaniesEntity } from './companies.entity';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import { CreateCompaniesDTO, UpdateCompaniesDTO } from './companies.dto';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CompaniesRepository extends CrudQueryRepository<
  CompaniesEntity,
  CreateCompaniesDTO,
  UpdateCompaniesDTO
> {
  constructor(dataSource: DataSource, @Inject(REQUEST) request: Request) {
    super(dataSource, request, CompaniesEntity);
  }
}
