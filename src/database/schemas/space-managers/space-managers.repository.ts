import { CrudQueryRepository } from 'src/shared/database/repositories/crud-query.repository';
import { DataSource } from 'typeorm';
import { SpaceManagersEntity } from './space-managers.entity';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import {
  CreateSpaceManagersDTO,
  UpdateSpaceManagersDTO,
} from './space-managers.dto';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class SpaceManagersRepository extends CrudQueryRepository<
  SpaceManagersEntity,
  CreateSpaceManagersDTO,
  UpdateSpaceManagersDTO
> {
  constructor(dataSource: DataSource, @Inject(REQUEST) request: Request) {
    super(dataSource, request, SpaceManagersEntity);
  }
}
