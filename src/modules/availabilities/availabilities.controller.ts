import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CrudQueryController } from 'src/shared/crud/controllers/crud-query.controller';
import { AvailabilitiesEntity } from 'src/database/schemas/availabilities/availabilities.entity';
import {
  CreateAvailabilitiesDTO,
  UpdateAvailabilitiesDTO,
  AvailabilitiesDto,
} from 'src/database/schemas/availabilities/availabilities.dto';
import { AvailabilitiesService } from './availabilities.service';

// Criamos o controlador base usando a função factory
const AvailabilitiesControllerBase = CrudQueryController<
  AvailabilitiesEntity,
  typeof CreateAvailabilitiesDTO,
  typeof UpdateAvailabilitiesDTO,
  typeof AvailabilitiesDto
>(
  'availabilities',
  CreateAvailabilitiesDTO,
  UpdateAvailabilitiesDTO,
  AvailabilitiesDto,
);

@ApiTags('Disponibilidades')
@Controller('availabilities')
export class AvailabilitiesController extends AvailabilitiesControllerBase {
  constructor(readonly availabilitiesService: AvailabilitiesService) {
    super(availabilitiesService);
  }
}
