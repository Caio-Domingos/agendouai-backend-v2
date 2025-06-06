import { CrudQueryRepository } from 'src/shared/database/repositories/crud-query.repository';
import { DataSource } from 'typeorm';
import { CompaniesEntity } from './companies.entity';
import { CreateCompaniesDTO, UpdateCompaniesDTO } from './companies.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CompaniesRepository extends CrudQueryRepository<
  CompaniesEntity,
  CreateCompaniesDTO,
  UpdateCompaniesDTO
> {
  constructor(dataSource: DataSource) {
    super(dataSource, CompaniesEntity);
  }

  findByCnpj(cnpj: string) {
    return this.getRepository(CompaniesEntity)
      .createQueryBuilder('companies')
      .where('companies.cpf_cnpj = :cnpj', { cnpj })
      .getOne();
  }
}
