import { CrudQueryRepository } from 'src/shared/database/repositories/crud-query.repository';
import { DataSource } from 'typeorm';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import { Inject, Injectable } from '@nestjs/common';
import { AlertEntity } from './alerts.entity';
import { CreateAlertDTO, UpdateAlertDTO } from './alerts.dto';

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
