import { CrudQueryRepository } from 'src/shared/database/repositories/crud-query.repository';
import { DataSource } from 'typeorm';
import { CompanySubscriptionHistoryEntity } from './company-subscription-history.entity';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import {
  CreateCompanySubscriptionHistoryDTO,
  UpdateCompanySubscriptionHistoryDTO,
} from './company-subscription-history.dto';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CompanySubscriptionHistoryRepository extends CrudQueryRepository<
  CompanySubscriptionHistoryEntity,
  CreateCompanySubscriptionHistoryDTO,
  UpdateCompanySubscriptionHistoryDTO
> {
  constructor(dataSource: DataSource, @Inject(REQUEST) request: Request) {
    super(dataSource, request, CompanySubscriptionHistoryEntity);
  }
}
