import { CrudQueryRepository } from 'src/shared/database/repositories/crud-query.repository';
import { DataSource } from 'typeorm';
import { CompanySubscriptionHistoryEntity } from './company-subscription-history.entity';
import {
  CreateCompanySubscriptionHistoryDTO,
  UpdateCompanySubscriptionHistoryDTO,
} from './company-subscription-history.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CompanySubscriptionHistoryRepository extends CrudQueryRepository<
  CompanySubscriptionHistoryEntity,
  CreateCompanySubscriptionHistoryDTO,
  UpdateCompanySubscriptionHistoryDTO
> {
  constructor(dataSource: DataSource) {
    super(dataSource, CompanySubscriptionHistoryEntity);
  }
}
