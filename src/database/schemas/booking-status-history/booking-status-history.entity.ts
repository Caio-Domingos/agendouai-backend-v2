import { Entity, Column, ManyToOne, JoinColumn, Relation } from 'typeorm';
import { BaseEntity } from '../../../shared/database/entities/base.entity';
import {
  BookingStatusHistory,
  BookingStatus,
} from './booking-status-history.model';
import { UserEntity } from '../user/user.entity';
// Se BookingEntity já existir, descomente a linha abaixo
// import { BookingEntity } from '../booking/booking.entity';
import { CompanyEntity } from '../companies/company.entity';

@Entity('booking_status_history')
export class BookingStatusHistoryEntity
  extends BaseEntity
  implements BookingStatusHistory
{
  @Column({ name: 'booking_id' })
  bookingId: number;

  @Column({
    type: 'enum',
    enum: BookingStatus,
    default: BookingStatus.PENDENTE,
  })
  status: BookingStatus;

  @Column({
    name: 'status_date',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  statusDate: Date;

  @Column({ name: 'company_id' })
  companyId: number;

  @Column({ name: 'changed_by' })
  changedBy: number;

  // Relacionamentos (descomente se as entidades existirem)
  // @ManyToOne(() => BookingEntity)
  // @JoinColumn({ name: 'booking_id' })
  // booking: Relation<BookingEntity>;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'changed_by' })
  changedByUser: Relation<UserEntity>;

  @ManyToOne(() => CompanyEntity)
  @JoinColumn({ name: 'company_id' })
  company: Relation<CompanyEntity>;
}
