import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Relation,
  OneToMany,
  Index,
} from 'typeorm';
import { BaseEntity } from '../../../shared/database/entities/base.entity';
import { Space, SpaceStatus } from './spaces.model';
import { CompaniesEntity } from '../companies/companies.entity';
import { AvailabilitiesEntity } from '../availabilities/availabilities.entity';
import { BookingEntity } from '../bookings/bookings.entity';

@Entity('spaces')
@Index('IDX_SPACES_COMPANY', ['companyId'])
@Index('IDX_SPACES_STATUS', ['status'])
@Index('IDX_SPACES_NAME', ['name'])
@Index('IDX_SPACES_CREATED_BY', ['createdBy'])
@Index('IDX_SPACES_UPDATED_BY', ['updatedBy'])
export class SpacesEntity extends BaseEntity implements Space {
  // Not null columns
  @Column({ name: 'company_id', type: 'integer' })
  companyId: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ name: 'created_by', type: 'integer' })
  createdBy: number;

  @Column({ name: 'updated_by', type: 'integer' })
  updatedBy: number;

  // Nullable columns
  @Column({
    type: 'enum',
    enum: SpaceStatus,
    default: SpaceStatus.ATIVO,
  })
  status?: SpaceStatus;

  @Column({ name: 'multiple_bookings', type: 'boolean', default: false })
  multipleBookings?: boolean;

  @Column({ name: 'photo_url', type: 'text', nullable: true })
  photoUrl?: string;

  // FK columns
  // (companyId já está acima)

  // Relationships
  @ManyToOne(() => CompaniesEntity, (company) => company.spaces, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'company_id' })
  company: Relation<CompaniesEntity>;

  @OneToMany(() => AvailabilitiesEntity, (availability) => availability.space)
  availabilities: Relation<AvailabilitiesEntity[]>;

  @OneToMany(() => BookingEntity, (booking) => booking.space)
  bookings: Relation<BookingEntity[]>;
}
