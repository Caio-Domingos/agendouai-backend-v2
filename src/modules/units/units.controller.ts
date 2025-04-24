import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CrudQueryController } from 'src/shared/crud/controllers/crud-query.controller';
import { UnitEntity } from 'src/database/schemas/units/units.entity';
import {
  CreateUnitDTO,
  UpdateUnitDTO,
  UnitDto,
} from 'src/database/schemas/units/units.dto';
import { UnitService } from './units.service';

// Controller base factory
const UnitControllerBase = CrudQueryController<
  UnitEntity,
  typeof CreateUnitDTO,
  typeof UpdateUnitDTO,
  typeof UnitDto
>('units', CreateUnitDTO, UpdateUnitDTO, UnitDto);

@ApiTags('Unidades')
@Controller('units')
export class UnitController extends UnitControllerBase {
  constructor(readonly unitService: UnitService) {
    super(unitService);
  }
}
