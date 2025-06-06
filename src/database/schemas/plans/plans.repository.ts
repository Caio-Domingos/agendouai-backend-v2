import { CrudQueryRepository } from 'src/shared/database/repositories/crud-query.repository';
import { DataSource } from 'typeorm';
import { PlansEntity } from './plans.entity';
import { CreatePlansDTO, UpdatePlansDTO } from './plans.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PlansRepository extends CrudQueryRepository<
  PlansEntity,
  CreatePlansDTO,
  UpdatePlansDTO
> {
  constructor(dataSource: DataSource) {
    super(dataSource, PlansEntity);
  }
}
