import { CrudQueryRepository } from 'src/shared/database/repositories/crud-query.repository';
import { DataSource } from 'typeorm';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import { Inject, Injectable } from '@nestjs/common';
import { PageQuestionEntity } from './page-question.entity';
import {
  CreatePageQuestionDTO,
  UpdatePageQuestionDTO,
} from './page-question.dto';

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
