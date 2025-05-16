import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Relation,
  Index,
} from 'typeorm';
import { BaseEntity } from '../../../shared/database/entities/base.entity';
import { Availability, WeekDayName } from './availabilities.model';
import { SpacesEntity } from '../spaces/spaces.entity';
import { CompaniesEntity } from '../companies/companies.entity';

@Entity('availabilities')
@Index('IDX_AVAILABILITIES_COMPANY', ['companyId'])
@Index('IDX_AVAILABILITIES_SPACE', ['spaceId'])
@Index('IDX_AVAILABILITIES_WEEKDAY', ['weekday'])
export class AvailabilitiesEntity extends BaseEntity implements Availability {
  // Not null columns
  @Column({ name: 'opening_time', type: 'integer' })
  openingTime: number;

  @Column({ name: 'closing_time', type: 'integer' })
  closingTime: number;

  @Column({ type: 'varchar', length: 20 })
  weekday: WeekDayName;

  @Column({ name: 'min_days_cancel', type: 'integer', default: 0 })
  minDaysCancel: number;

  @Column({ name: 'weekday_index', type: 'integer' })
  weekdayIndex: number;

  @Column({ name: 'interval_minutes', type: 'integer', default: 30 })
  intervalMinutes: number;

  @Column({
    name: 'configuration',
    type: 'jsonb',
    default: () => "'{}'",
  })
  configuration: Record<string, any>;

  @Column({ name: 'is_open', type: 'boolean', default: true })
  isOpen: boolean;
  @Column({ name: 'is_24_hours', type: 'boolean', default: false })
  is24Hours: boolean;

  // Nullable columns

  // FK columns
  @Column({ name: 'company_id', type: 'integer' })
  companyId: number;

  @Column({ name: 'space_id', type: 'integer', nullable: true })
  spaceId?: number;

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
