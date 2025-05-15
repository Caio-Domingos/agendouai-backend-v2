import { CrudQueryRepository } from 'src/shared/database/repositories/crud-query.repository';
import { DataSource } from 'typeorm';
import { PeopleEntity } from './people.entity';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import { CreatePeopleDTO, UpdatePeopleDTO } from './people.dto';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class PeopleRepository extends CrudQueryRepository<
  PeopleEntity,
  CreatePeopleDTO,
  UpdatePeopleDTO
> {
  constructor(dataSource: DataSource, @Inject(REQUEST) request: Request) {
    super(dataSource, request, PeopleEntity);
  }

  findByCpf(cpf: string) {
    return this.getRepository(PeopleEntity)
      .createQueryBuilder('people')
      .where('people.cpf = :cpf', { cpf })
      .getOne();
  }
}
