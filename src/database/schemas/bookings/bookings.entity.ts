import { Entity, Column, ManyToOne, JoinColumn, Relation } from 'typeorm';
import { BaseEntity } from '../../../shared/database/entities/base.entity';
import { Booking, BookingStatus } from './bookings.model';
import { UserEntity } from '../user/user.entity';
import { CompanyEntity } from '../companies/company.entity';
// import { SpaceEntity } from '../spaces/spaces.entity'; // Descomente se existir

@Entity('bookings')
export class BookingEntity extends BaseEntity implements Booking {
  @Column({ name: 'booking_date', type: 'timestamptz' })
  bookingDate: Date;

  @Column({ name: 'weekday_index', nullable: true })
  weekdayIndex?: number;

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

  @Column({ name: 'notes', type: 'text', nullable: true })
  notes?: string;

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

  // Relacionamentos (descomente se as entidades existirem)
  // @ManyToOne(() => SpaceEntity)
  // @JoinColumn({ name: 'space_id' })
  // space: Relation<SpaceEntity>;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: Relation<UserEntity>;

  @ManyToOne(() => CompanyEntity)
  @JoinColumn({ name: 'company_id' })
  company: Relation<CompanyEntity>;
}
