import {
  Entity,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  Relation,
  Index,
} from 'typeorm';
import { BaseEntity } from '../../../shared/database/entities/base.entity';
import { Company, CompanyStatus, PaymentStatus } from './companies.model';
import { SpacesEntity } from '../spaces/spaces.entity';
import { AvailabilitiesEntity } from '../availabilities/availabilities.entity';
import { BookingEntity } from '../bookings/bookings.entity';
import { CompanySubscriptionHistoryEntity } from '../company-subscription-history/company-subscription-history.entity';
import { CompanyCategoriesEntity } from '../company-categories/company-categories.entity';
import { UserEntity } from '../users/users.entity';
import { SpaceManagersEntity } from '../space-managers/space-managers.entity';

@Entity('companies')
@Index('IDX_COMPANIES_CPFCNPJ', ['cpfCnpj'], { unique: true })
@Index('IDX_COMPANIES_CATEGORY', ['categoryId'])
@Index('IDX_COMPANIES_CURRENT_PLAN', ['currentPlanId'])
@Index('IDX_COMPANIES_STATUS', ['status'])
@Index('IDX_COMPANIES_CREATED_BY', ['createdBy'])
@Index('IDX_COMPANIES_UPDATED_BY', ['updatedBy'])
export class CompaniesEntity extends BaseEntity implements Company {
  // Not null columns
  @Column({ name: 'cpf_cnpj', type: 'varchar', length: 20 })
  cpfCnpj: string;

  @Column({ name: 'created_by', type: 'integer' })
  createdBy: number;

  @Column({ name: 'updated_by', type: 'integer' })
  updatedBy: number;

  @Column({
    type: 'varchar',
    default: CompanyStatus.ACTIVE,
  })
  status: CompanyStatus;

  // Nullable columns
  @Column({ type: 'varchar', length: 10, nullable: true })
  cep?: string;

  @Column({ name: 'category_id', type: 'integer' })
  categoryId: number;

  @Column({ name: 'logo_url', type: 'text', nullable: true })
  logoUrl?: string;

  @Column({ name: 'current_plan_id', type: 'integer', nullable: true })
  currentPlanId?: number;

  @Column({
    name: 'current_payment_status',
    type: 'varchar',
    default: PaymentStatus.TRIAL,
    nullable: true,
  })
  currentPaymentStatus?: PaymentStatus;

  @Column({
    name: 'stripe_customer_id',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  stripeCustomerId?: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  name?: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  city?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  state?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  country?: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  address?: string;

  @Column({
    name: 'address_number',
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  addressNumber?: string;

  @Column({
    name: 'default_availability',
    type: 'jsonb',
    default: () => "'{}'",
  })
  defaultAvailability?: object;

  // FK columns
  // (categoryId, currentPlanId já estão acima como nullable)

  // Relationships
  @OneToMany(() => UserEntity, (user) => user.company, { cascade: true })
  users: Relation<UserEntity[]>;

  @OneToMany(() => SpacesEntity, (space) => space.company, { cascade: true })
  spaces: Relation<SpacesEntity[]>;

  @OneToMany(
    () => AvailabilitiesEntity,
    (availability) => availability.company,
    { cascade: true },
  )
  availabilities: Relation<AvailabilitiesEntity[]>;

  @OneToMany(() => BookingEntity, (booking) => booking.company, {
    cascade: true,
  })
  bookings: Relation<BookingEntity[]>;

  @OneToMany(() => CompanySubscriptionHistoryEntity, (csh) => csh.company, {
    cascade: true,
  })
  subscriptionHistory: Relation<CompanySubscriptionHistoryEntity[]>;

  @OneToMany(() => SpaceManagersEntity, (spaceManger) => spaceManger.company)
  spaceManagers: Relation<SpaceManagersEntity[]>;

  @ManyToOne(() => CompanyCategoriesEntity, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'category_id' })
  category: Relation<CompanyCategoriesEntity>;
}
