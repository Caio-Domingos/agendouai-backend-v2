import { CrudQueryRepository } from 'src/shared/database/repositories/crud-query.repository';
import { DataSource } from 'typeorm';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import { Inject, Injectable } from '@nestjs/common';
import { QuestionEntity } from './questions.entity';
import { CreateQuestionDTO, UpdateQuestionDTO } from './questions.dto';

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
