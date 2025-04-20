import { Request } from 'express';
import { CrudQueryRepository } from 'src/shared/database/repositories/crud-query.repository';
import { DataSource } from 'typeorm';

import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';

import { CreatePageDTO, UpdatePageDTO } from './pages.dto';
import { PageEntity } from './pages.entity';

@Injectable()
export class PageRepository extends CrudQueryRepository<
  PageEntity,
  CreatePageDTO,
  UpdatePageDTO
> {
  constructor(dataSource: DataSource, @Inject(REQUEST) request: Request) {
    super(dataSource, request, PageEntity);
  }
}
