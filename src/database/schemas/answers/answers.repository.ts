import { CrudQueryRepository } from 'src/shared/database/repositories/crud-query.repository';
import { DataSource } from 'typeorm';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import { Inject, Injectable } from '@nestjs/common';
import { AnswerEntity } from './answers.entity';
import { CreateAnswerDTO, UpdateAnswerDTO } from './answers.dto';

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
