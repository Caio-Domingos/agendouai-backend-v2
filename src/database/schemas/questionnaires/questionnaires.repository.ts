import { CrudQueryRepository } from 'src/shared/database/repositories/crud-query.repository';
import { DataSource } from 'typeorm';
import { QuestionnaireEntity } from './questionnaires.entity';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import {
  CreateQuestionnaireDTO,
  UpdateQuestionnaireDTO,
} from './questionnaires.dto';
import { Inject, Injectable } from '@nestjs/common';

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
