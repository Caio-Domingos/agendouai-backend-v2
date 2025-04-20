import { Request } from 'express';
import { CrudQueryRepository } from 'src/shared/database/repositories/crud-query.repository';
import { DataSource } from 'typeorm';

import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';

import {
  CreatePageQuestionDTO,
  UpdatePageQuestionDTO,
} from './page-question.dto';
import { PageQuestionEntity } from './page-question.entity';

@Injectable()
export class PageQuestionRepository extends CrudQueryRepository<
  PageQuestionEntity,
  CreatePageQuestionDTO,
  UpdatePageQuestionDTO
> {
  constructor(dataSource: DataSource, @Inject(REQUEST) request: Request) {
    super(dataSource, request, PageQuestionEntity);
  }
}
