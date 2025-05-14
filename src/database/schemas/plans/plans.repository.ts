import { CrudQueryRepository } from 'src/shared/database/repositories/crud-query.repository';
import { DataSource } from 'typeorm';
import { PlansEntity } from './plans.entity';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import { CreatePlansDTO, UpdatePlansDTO } from './plans.dto';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class PlansRepository extends CrudQueryRepository<
  PlansEntity,
  CreatePlansDTO,
  UpdatePlansDTO
> {
  constructor(dataSource: DataSource, @Inject(REQUEST) request: Request) {
    super(dataSource, request, PlansEntity);
  }
}
