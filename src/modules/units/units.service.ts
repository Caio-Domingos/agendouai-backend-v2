import { Injectable } from '@nestjs/common';
import { CrudQueryService } from 'src/shared/crud/services/crud-query.service';
import { UnitEntity } from 'src/database/schemas/units/units.entity';
import {
  CreateUnitDTO,
  UpdateUnitDTO,
} from 'src/database/schemas/units/units.dto';
import { UnitRepository } from 'src/database/schemas/units/units.repository';

@Injectable()
export class UnitService extends CrudQueryService<
  UnitEntity,
  CreateUnitDTO,
  UpdateUnitDTO
> {
  constructor(private unitRepository: UnitRepository) {
    super(unitRepository);
  }
}
