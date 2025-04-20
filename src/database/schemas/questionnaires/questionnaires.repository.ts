import { Request } from 'express';
import { CrudQueryRepository } from 'src/shared/database/repositories/crud-query.repository';
import { DataSource } from 'typeorm';

import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';

import {
  CreateQuestionnaireDTO,
  UpdateQuestionnaireDTO,
} from './questionnaires.dto';
import { QuestionnaireEntity } from './questionnaires.entity';

@Injectable()
export class QuestionnaireRepository extends CrudQueryRepository<
  QuestionnaireEntity,
  CreateQuestionnaireDTO,
  UpdateQuestionnaireDTO
> {
  constructor(dataSource: DataSource, @Inject(REQUEST) request: Request) {
    super(dataSource, request, QuestionnaireEntity);
  }
}
