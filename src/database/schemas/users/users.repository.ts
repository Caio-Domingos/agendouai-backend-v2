import { CrudQueryRepository } from 'src/shared/database/repositories/crud-query.repository';
import { DataSource } from 'typeorm';
import { UsersEntity } from './users.entity';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import { CreateUsersDTO, UpdateUsersDTO } from './users.dto';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UsersRepository extends CrudQueryRepository<
  UsersEntity,
  CreateUsersDTO,
  UpdateUsersDTO
> {
  constructor(dataSource: DataSource, @Inject(REQUEST) request: Request) {
    super(dataSource, request, UsersEntity);
  }
}
