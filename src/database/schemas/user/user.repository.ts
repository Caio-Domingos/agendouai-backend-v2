import { CrudQueryRepository } from 'src/shared/database/repositories/crud-query.repository';
import { DataSource } from 'typeorm';
import { UserEntity } from './user.entity';
import { Request } from 'express';
import { CreateUserDTO, UpdateUserDTO } from './user.dto';

export class UserRepository extends CrudQueryRepository<
  UserEntity,
  CreateUserDTO,
  UpdateUserDTO
> {
  constructor(dataSource: DataSource, request: Request) {
    super(dataSource, request, UserEntity);
  }
}
