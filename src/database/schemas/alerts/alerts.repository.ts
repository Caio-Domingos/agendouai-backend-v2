import { Request } from 'express';
import { CrudQueryRepository } from 'src/shared/database/repositories/crud-query.repository';
import { DataSource } from 'typeorm';

import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';

import { CreateAlertDTO, UpdateAlertDTO } from './alerts.dto';
import { AlertEntity } from './alerts.entity';

@Injectable()
export class AlertRepository extends CrudQueryRepository<
  AlertEntity,
  CreateAlertDTO,
  UpdateAlertDTO
> {
  constructor(dataSource: DataSource, @Inject(REQUEST) request: Request) {
    super(dataSource, request, AlertEntity);
  }
}
