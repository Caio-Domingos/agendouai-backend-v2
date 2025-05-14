import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../../shared/database/entities/base.entity';
import { CompanyCategory } from './company-categories.model';

@Entity('company_categories')
export class CompanyCategoriesEntity
  extends BaseEntity
  implements CompanyCategory
{
  @Column({ type: 'varchar', length: 100 })
  description: string;

  @Column({
    name: 'partition_prefix',
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  partitionPrefix?: string;
}
