import { CrudQueryRepository } from 'src/shared/database/repositories/crud-query.repository';
import { DataSource } from 'typeorm';
import { SpaceManagersEntity } from './space-managers.entity';
import {
  CreateSpaceManagersDTO,
  UpdateSpaceManagersDTO,
} from './space-managers.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SpaceManagersRepository extends CrudQueryRepository<
  SpaceManagersEntity,
  CreateSpaceManagersDTO,
  UpdateSpaceManagersDTO
> {
  constructor(dataSource: DataSource) {
    super(dataSource, SpaceManagersEntity);
  }
}
