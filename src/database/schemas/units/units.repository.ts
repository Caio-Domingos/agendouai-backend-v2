import { CrudQueryRepository } from 'src/shared/database/repositories/crud-query.repository';
import { DataSource } from 'typeorm';
import { UnitEntity } from './units.entity';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import { CreateUnitDTO, UpdateUnitDTO } from './units.dto';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UnitRepository extends CrudQueryRepository<
  UnitEntity,
  CreateUnitDTO,
  UpdateUnitDTO
> {
  constructor(dataSource: DataSource, @Inject(REQUEST) request: Request) {
    super(dataSource, request, UnitEntity);
  }
}
