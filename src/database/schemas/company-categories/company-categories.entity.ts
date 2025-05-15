import { Entity, Column, OneToMany, Index } from 'typeorm';
import { BaseEntity } from '../../../shared/database/entities/base.entity';
import { CompanyCategory } from './company-categories.model';
import { CompaniesEntity } from '../companies/companies.entity';

@Entity('company_categories')
@Index('IDX_COMPANY_CATEGORIES_DESCRIPTION', ['description'])
@Index('IDX_COMPANY_CATEGORIES_PARTITION_PREFIX', ['partitionPrefix'])
export class CompanyCategoriesEntity
  extends BaseEntity
  implements CompanyCategory
{
  // Not null columns
  @Column({ type: 'varchar', length: 100 })
  description: string;

  // Nullable columns
  @Column({
    name: 'space_prefix',
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  spacePrefix?: string;

  // FK columns
  // (none)

  // Relationships
  @OneToMany(() => CompaniesEntity, (company) => company.category)
  companies: CompaniesEntity[];
}
