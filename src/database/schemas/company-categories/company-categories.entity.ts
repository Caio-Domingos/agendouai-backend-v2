import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../shared/database/entities/base.entity';
import { CompanyCategory } from './company-categories.model';
import { CompaniesEntity } from '../companies/companies.entity';

@Entity('company_categories')
export class CompanyCategoriesEntity
  extends BaseEntity
  implements CompanyCategory
{
  // Not null columns
  @Column({ type: 'varchar', length: 100 })
  description: string;

  // Nullable columns
  @Column({
    name: 'partition_prefix',
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  partitionPrefix?: string;

  // FK columns
  // (none)

  // Relationships
  @OneToMany(() => CompaniesEntity, (company) => company.category)
  companies: CompaniesEntity[];
}
