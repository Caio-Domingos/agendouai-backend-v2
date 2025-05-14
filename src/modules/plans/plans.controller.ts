import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CrudQueryController } from 'src/shared/crud/controllers/crud-query.controller';
import { PlansEntity } from 'src/database/schemas/plans/plans.entity';
import {
  CreatePlansDTO,
  UpdatePlansDTO,
  PlansDto,
} from 'src/database/schemas/plans/plans.dto';
import { PlansService } from './plans.service';

// Criamos o controlador base usando a função factory
const PlansControllerBase = CrudQueryController<
  PlansEntity,
  typeof CreatePlansDTO,
  typeof UpdatePlansDTO,
  typeof PlansDto
>('plans', CreatePlansDTO, UpdatePlansDTO, PlansDto);

@ApiTags('Planos')
@Controller('plans')
export class PlansController extends PlansControllerBase {
  constructor(readonly plansService: PlansService) {
    super(plansService);
  }
}
