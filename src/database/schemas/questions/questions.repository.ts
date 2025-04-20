import { Request } from 'express';
import { CrudQueryRepository } from 'src/shared/database/repositories/crud-query.repository';
import { DataSource } from 'typeorm';

import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';

import { CreateQuestionDTO, UpdateQuestionDTO } from './questions.dto';
import { QuestionEntity } from './questions.entity';

@Injectable()
export class QuestionRepository extends CrudQueryRepository<
  QuestionEntity,
  CreateQuestionDTO,
  UpdateQuestionDTO
> {
  constructor(dataSource: DataSource, @Inject(REQUEST) request: Request) {
    super(dataSource, request, QuestionEntity);
  }
}
