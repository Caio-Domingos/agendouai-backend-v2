import { CrudQueryRepository } from 'src/shared/database/repositories/crud-query.repository';
import { DataSource } from 'typeorm';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import { Inject, Injectable } from '@nestjs/common';
import { PageEntity } from './pages.entity';
import { CreatePageDTO, UpdatePageDTO } from './pages.dto';

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
