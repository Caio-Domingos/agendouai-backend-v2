import { Request } from 'express';
import { CrudQueryRepository } from 'src/shared/database/repositories/crud-query.repository';
import { DataSource } from 'typeorm';

import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';

import { CreateAnswerDTO, UpdateAnswerDTO } from './answers.dto';
import { AnswerEntity } from './answers.entity';

@Injectable()
export class AnswerRepository extends CrudQueryRepository<
  AnswerEntity,
  CreateAnswerDTO,
  UpdateAnswerDTO
> {
  constructor(dataSource: DataSource, @Inject(REQUEST) request: Request) {
    super(dataSource, request, AnswerEntity);
  }
}
