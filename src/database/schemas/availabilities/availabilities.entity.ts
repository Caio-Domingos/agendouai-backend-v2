import { Entity, Column, ManyToOne, JoinColumn, Relation } from 'typeorm';
import { BaseEntity } from '../../../shared/database/entities/base.entity';
import { Availability } from './availabilities.model';
import { SpacesEntity } from '../spaces/spaces.entity';
import { CompaniesEntity } from '../companies/companies.entity';

@Entity('availabilities')
export class AvailabilitiesEntity extends BaseEntity implements Availability {
  // Not null columns
  @Column({ name: 'opening_time', type: 'integer' })
  openingTime: number;

  @Column({ name: 'closing_time', type: 'integer' })
  closingTime: number;

  @Column({ type: 'varchar', length: 20 })
  weekday: string;

  @Column({ name: 'company_id', type: 'integer' })
  companyId: number;

  // Nullable columns
  @Column({ type: 'boolean', default: true })
  active?: boolean;

  @Column({ name: 'min_days_cancel', type: 'integer', nullable: true })
  minDaysCancel?: number;

  @Column({ name: 'weekday_index', type: 'integer', nullable: true })
  weekdayIndex?: number;

  @Column({ name: 'interval_minutes', type: 'integer', nullable: true })
  intervalMinutes?: number;

  @Column({ name: 'space_id', type: 'integer', nullable: true })
  spaceId?: number;

  // FK columns
  // (companyId, spaceId já estão acima)

  // Relationships
  @ManyToOne(() => SpacesEntity, (space) => space.availabilities, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'space_id' })
  space: Relation<SpacesEntity>;

  @ManyToOne(() => CompaniesEntity, (company) => company.availabilities, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'company_id' })
  company: Relation<CompaniesEntity>;
}
