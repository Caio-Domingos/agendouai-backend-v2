import { Injectable } from '@nestjs/common';
import { CrudQueryService } from 'src/shared/crud/services/crud-query.service';
import { PlansEntity } from 'src/database/schemas/plans/plans.entity';
import {
  CreatePlansDTO,
  UpdatePlansDTO,
} from 'src/database/schemas/plans/plans.dto';
import { PlansRepository } from 'src/database/schemas/plans/plans.repository';

@Injectable()
export class PlansService extends CrudQueryService<
  PlansEntity,
  CreatePlansDTO,
  UpdatePlansDTO
> {
  constructor(private plansRepository: PlansRepository) {
    super(plansRepository);
  }
}
