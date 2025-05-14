import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CrudQueryController } from 'src/shared/crud/controllers/crud-query.controller';
import { CompanyCategoriesEntity } from 'src/database/schemas/company-categories/company-categories.entity';
import {
  CreateCompanyCategoriesDTO,
  UpdateCompanyCategoriesDTO,
  CompanyCategoriesDto,
} from 'src/database/schemas/company-categories/company-categories.dto';
import { CompanyCategoriesService } from './company-categories.service';

// Criamos o controlador base usando a função factory
const CompanyCategoriesControllerBase = CrudQueryController<
  CompanyCategoriesEntity,
  typeof CreateCompanyCategoriesDTO,
  typeof UpdateCompanyCategoriesDTO,
  typeof CompanyCategoriesDto
>(
  'company-categories',
  CreateCompanyCategoriesDTO,
  UpdateCompanyCategoriesDTO,
  CompanyCategoriesDto,
);

@ApiTags('Categorias de Empresas')
@Controller('company-categories')
export class CompanyCategoriesController extends CompanyCategoriesControllerBase {
  constructor(readonly companyCategoriesService: CompanyCategoriesService) {
    super(companyCategoriesService);
  }
}
