import { CrudQueryRepository } from 'src/shared/database/repositories/crud-query.repository';
import { DataSource } from 'typeorm';
import { UserEntity } from './users.entity';
import { CreateUserDTO, UpdateUserDTO } from './users.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersRepository extends CrudQueryRepository<
  UserEntity,
  CreateUserDTO,
  UpdateUserDTO
> {
  constructor(dataSource: DataSource) {
    super(dataSource, UserEntity);
  }

  findByEmailWithPassword(email: string) {
    return this.getRepository(UserEntity)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.people', 'people')
      .where('user.username = :email', { email })
      .getOne();
  }

  findByEmail(email: string) {
    return this.getRepository(UserEntity)
      .createQueryBuilder('user')
      .where('user.username = :email', { email })
      .select(['user.id', 'user.username'])
      .getOne();
  }
}
