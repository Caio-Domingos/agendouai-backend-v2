import { Injectable } from '@nestjs/common';
import { CrudQueryService } from 'src/shared/crud/services/crud-query.service';
import { CompanySubscriptionHistoryEntity } from 'src/database/schemas/company-subscription-history/company-subscription-history.entity';
import {
  CreateCompanySubscriptionHistoryDTO,
  UpdateCompanySubscriptionHistoryDTO,
} from 'src/database/schemas/company-subscription-history/company-subscription-history.dto';
import { CompanySubscriptionHistoryRepository } from 'src/database/schemas/company-subscription-history/company-subscription-history.repository';

@Injectable()
export class CompanySubscriptionHistoryService extends CrudQueryService<
  CompanySubscriptionHistoryEntity,
  CreateCompanySubscriptionHistoryDTO,
  UpdateCompanySubscriptionHistoryDTO
> {
  constructor(
    private companySubscriptionHistoryRepository: CompanySubscriptionHistoryRepository,
  ) {
    super(companySubscriptionHistoryRepository);
  }
}
