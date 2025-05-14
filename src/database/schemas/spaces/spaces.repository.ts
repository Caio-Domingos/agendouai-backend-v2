import { CrudQueryRepository } from 'src/shared/database/repositories/crud-query.repository';
import { DataSource } from 'typeorm';
import { SpacesEntity } from './spaces.entity';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import { CreateSpacesDTO, UpdateSpacesDTO } from './spaces.dto';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class SpacesRepository extends CrudQueryRepository<
  SpacesEntity,
  CreateSpacesDTO,
  UpdateSpacesDTO
> {
  constructor(dataSource: DataSource, @Inject(REQUEST) request: Request) {
    super(dataSource, request, SpacesEntity);
  }
}
