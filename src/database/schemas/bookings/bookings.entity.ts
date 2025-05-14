import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Relation,
  Index,
} from 'typeorm';
import { BaseEntity } from '../../../shared/database/entities/base.entity';
import { Booking, BookingStatus } from './bookings.model';
import { SpacesEntity } from '../spaces/spaces.entity';
import { UserEntity } from '../users/users.entity';
import { CompaniesEntity } from '../companies/companies.entity';

@Entity('bookings')
@Index('IDX_BOOKINGS_SPACE', ['spaceId'])
@Index('IDX_BOOKINGS_USER', ['userId'])
@Index('IDX_BOOKINGS_COMPANY', ['companyId'])
@Index('IDX_BOOKINGS_DATE', ['bookingDate'])
@Index('IDX_BOOKINGS_STATUS', ['status'])
@Index('IDX_BOOKINGS_STATUS_UPDATED_AT', ['statusUpdatedAt'])
export class BookingEntity extends BaseEntity implements Booking {
  // Not null columns
  @Column({ name: 'booking_date', type: 'timestamp with time zone' })
  bookingDate: Date;

  @Column({ name: 'space_id' })
  spaceId: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'company_id' })
  companyId: number;

  @Column({ name: 'start_time', type: 'float' })
  startTime: number;

  @Column({ name: 'end_time', type: 'float' })
  endTime: number;

  @Column({
    type: 'enum',
    enum: BookingStatus,
    default: BookingStatus.PENDING,
  })
  status: BookingStatus;

  @Column({
    name: 'status_updated_at',
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  statusUpdatedAt: Date;

  @Column({ name: 'weekday_index' })
  weekdayIndex: number;

  // Nullable columns

  @Column({ name: 'notes', type: 'text', nullable: true })
  notes?: string;

  // FK columns
  // (spaceId, userId, companyId já estão acima)

  // Relationships
  @ManyToOne(() => SpacesEntity, (space) => space.bookings, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'space_id' })
  space: Relation<SpacesEntity>;

  @ManyToOne(() => UserEntity, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: Relation<UserEntity>;

  @ManyToOne(() => CompaniesEntity, (company) => company.bookings, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'company_id' })
  company: Relation<CompaniesEntity>;
}
