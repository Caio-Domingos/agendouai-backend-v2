import { Injectable } from '@nestjs/common';
import { CrudQueryService } from 'src/shared/crud/services/crud-query.service';
import { AvailabilitiesEntity } from 'src/database/schemas/availabilities/availabilities.entity';
import {
  CreateAvailabilitiesDTO,
  UpdateAvailabilitiesDTO,
} from 'src/database/schemas/availabilities/availabilities.dto';
import { AvailabilitiesRepository } from 'src/database/schemas/availabilities/availabilities.repository';

@Injectable()
export class AvailabilitiesService extends CrudQueryService<
  AvailabilitiesEntity,
  CreateAvailabilitiesDTO,
  UpdateAvailabilitiesDTO
> {
  constructor(private availabilitiesRepository: AvailabilitiesRepository) {
    super(availabilitiesRepository);
  }
}
