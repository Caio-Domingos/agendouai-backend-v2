import { CrudQueryRepository } from 'src/shared/database/repositories/crud-query.repository';
import { DataSource } from 'typeorm';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import { Inject, Injectable } from '@nestjs/common';
import { SubmissionEntity } from './submissions.entity';
import { CreateSubmissionDTO, UpdateSubmissionDTO } from './submissions.dto';

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
