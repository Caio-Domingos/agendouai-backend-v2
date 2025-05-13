import { Request } from 'express';
import { CrudQueryRepository } from 'src/shared/database/repositories/crud-query.repository';
import { DataSource } from 'typeorm';

import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';

import { CreateUserDTO, UpdateUserDTO } from './user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository extends CrudQueryRepository<
  UserEntity,
  CreateUserDTO,
  UpdateUserDTO
> {
  constructor(dataSource: DataSource, @Inject(REQUEST) request: Request) {
    super(dataSource, request, UserEntity);
  }

  findByEmail(email: string) {
    return this.getRepository(UserEntity).findOne({ where: { email } });
  }

  findByEmailWithPassword(email: string) {
    return this.getRepository(UserEntity).findOne({
      where: { email },
      select: ['id', 'email', 'password', 'status'],
    });
  }
}
