import { CrudQueryRepository } from 'src/shared/database/repositories/crud-query.repository';
import { DataSource } from 'typeorm';
import { AvailabilitiesEntity } from './availabilities.entity';
import {
  CreateAvailabilitiesDTO,
  UpdateAvailabilitiesDTO,
} from './availabilities.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AvailabilitiesRepository extends CrudQueryRepository<
  AvailabilitiesEntity,
  CreateAvailabilitiesDTO,
  UpdateAvailabilitiesDTO
> {
  constructor(dataSource: DataSource) {
    super(dataSource, AvailabilitiesEntity);
  }
}
