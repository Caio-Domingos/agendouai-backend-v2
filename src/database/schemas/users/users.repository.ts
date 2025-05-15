import { CrudQueryRepository } from 'src/shared/database/repositories/crud-query.repository';
import { DataSource } from 'typeorm';
import { UserEntity } from './users.entity';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import { CreateUserDTO, UpdateUserDTO } from './users.dto';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UsersRepository extends CrudQueryRepository<
  UserEntity,
  CreateUserDTO,
  UpdateUserDTO
> {
  constructor(dataSource: DataSource, @Inject(REQUEST) request: Request) {
    super(dataSource, request, UserEntity);
  }

  findByEmailWithPassword(email: string) {
    return this.getRepository(UserEntity)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.people', 'people')
      .where('user.email = :email', { email })
      .getOne();
  }

  findByEmail(email: string) {
    return this.getRepository(UserEntity)
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .select(['user.id', 'user.email'])
      .getOne();
  }
}
