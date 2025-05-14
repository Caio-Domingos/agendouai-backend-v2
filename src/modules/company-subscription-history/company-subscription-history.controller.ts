import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CrudQueryController } from 'src/shared/crud/controllers/crud-query.controller';
import { CompanySubscriptionHistoryEntity } from 'src/database/schemas/company-subscription-history/company-subscription-history.entity';
import {
  CreateCompanySubscriptionHistoryDTO,
  UpdateCompanySubscriptionHistoryDTO,
  CompanySubscriptionHistoryDto,
} from 'src/database/schemas/company-subscription-history/company-subscription-history.dto';
import { CompanySubscriptionHistoryService } from './company-subscription-history.service';

// Criamos o controlador base usando a função factory
const CompanySubscriptionHistoryControllerBase = CrudQueryController<
  CompanySubscriptionHistoryEntity,
  typeof CreateCompanySubscriptionHistoryDTO,
  typeof UpdateCompanySubscriptionHistoryDTO,
  typeof CompanySubscriptionHistoryDto
>(
  'company-subscription-history',
  CreateCompanySubscriptionHistoryDTO,
  UpdateCompanySubscriptionHistoryDTO,
  CompanySubscriptionHistoryDto,
);

@ApiTags('Histórico de Assinaturas de Empresas')
@Controller('company-subscription-history')
export class CompanySubscriptionHistoryController extends CompanySubscriptionHistoryControllerBase {
  constructor(
    readonly companySubscriptionHistoryService: CompanySubscriptionHistoryService,
  ) {
    super(companySubscriptionHistoryService);
  }
}
