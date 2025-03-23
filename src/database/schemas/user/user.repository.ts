import { CrudQueryRepository } from 'src/shared/database/repositories/crud-query.repository';
import { DataSource } from 'typeorm';
import { UserEntity } from './user.entity';
import { Request } from 'express';
import { CreateUserDTO, UpdateUserDTO } from './user.dto';
import { InjectDataSource } from '@nestjs/typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';

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
