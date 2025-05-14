import { CrudQueryRepository } from 'src/shared/database/repositories/crud-query.repository';
import { DataSource } from 'typeorm';
import { AvailabilitiesEntity } from './availabilities.entity';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import {
  CreateAvailabilitiesDTO,
  UpdateAvailabilitiesDTO,
} from './availabilities.dto';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AvailabilitiesRepository extends CrudQueryRepository<
  AvailabilitiesEntity,
  CreateAvailabilitiesDTO,
  UpdateAvailabilitiesDTO
> {
  constructor(dataSource: DataSource, @Inject(REQUEST) request: Request) {
    super(dataSource, request, AvailabilitiesEntity);
  }
}
