import { Request } from 'express';
import { CrudQueryRepository } from 'src/shared/database/repositories/crud-query.repository';
import { DataSource } from 'typeorm';

import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';

import { CreateSubmissionDTO, UpdateSubmissionDTO } from './submissions.dto';
import { SubmissionEntity } from './submissions.entity';

@Injectable()
export class SubmissionRepository extends CrudQueryRepository<
  SubmissionEntity,
  CreateSubmissionDTO,
  UpdateSubmissionDTO
> {
  constructor(dataSource: DataSource, @Inject(REQUEST) request: Request) {
    super(dataSource, request, SubmissionEntity);
  }
}
