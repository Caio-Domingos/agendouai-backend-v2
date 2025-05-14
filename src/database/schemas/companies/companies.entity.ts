import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../../shared/database/entities/base.entity';
import { Company, CompanyStatus, PaymentStatus } from './companies.model';

@Entity('companies')
export class CompaniesEntity extends BaseEntity implements Company {
  @Column({ name: 'cpf_cnpj', type: 'varchar', length: 20 })
  cpfCnpj: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  cep?: string;

  @Column({ name: 'category_id', type: 'integer', nullable: true })
  categoryId?: number;

  @Column({ name: 'created_by', type: 'integer' })
  createdBy: number;

  @Column({ name: 'updated_by', type: 'integer' })
  updatedBy: number;

  @Column({ name: 'logo_url', type: 'text', nullable: true })
  logoUrl?: string;

  @Column({ type: 'integer', nullable: true })
  provider?: number;

  @Column({
    type: 'enum',
    enum: CompanyStatus,
    default: CompanyStatus.ATIVO,
  })
  status: CompanyStatus;

  @Column({ name: 'current_plan_id', type: 'integer', nullable: true })
  currentPlanId?: number;

  @Column({
    name: 'current_payment_status',
    type: 'enum',
    enum: PaymentStatus,
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
}
