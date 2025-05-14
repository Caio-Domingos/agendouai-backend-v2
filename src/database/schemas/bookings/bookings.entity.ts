import { Entity, Column, ManyToOne, JoinColumn, Relation } from 'typeorm';
import { BaseEntity } from '../../../shared/database/entities/base.entity';
import { Booking, BookingStatus } from './bookings.model';
import { SpacesEntity } from '../spaces/spaces.entity';
import { UserEntity } from '../users/users.entity';
import { CompaniesEntity } from '../companies/companies.entity';

@Entity('bookings')
export class BookingEntity extends BaseEntity implements Booking {
  // Not null columns
  @Column({ name: 'booking_date', type: 'timestamptz' })
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
    default: BookingStatus.PENDENTE,
  })
  status: BookingStatus;

  @Column({
    name: 'status_updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  statusUpdatedAt: Date;

  // Nullable columns
  @Column({ name: 'weekday_index', nullable: true })
  weekdayIndex?: number;

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
