import { CrudQueryRepository } from 'src/shared/database/repositories/crud-query.repository';
import { DataSource } from 'typeorm';
import { SpacesEntity } from './spaces.entity';
import { CreateSpacesDTO, UpdateSpacesDTO } from './spaces.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SpacesRepository extends CrudQueryRepository<
  SpacesEntity,
  CreateSpacesDTO,
  UpdateSpacesDTO
> {
  constructor(dataSource: DataSource) {
    super(dataSource, SpacesEntity);
  }
}
