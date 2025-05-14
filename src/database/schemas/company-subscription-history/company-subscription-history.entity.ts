import { Entity, Column, ManyToOne, JoinColumn, Relation } from 'typeorm';
import { BaseEntity } from '../../../shared/database/entities/base.entity';
import {
  CompanySubscriptionHistory,
  CompanySubscriptionPaymentStatus,
} from './company-subscription-history.model';
import { CompaniesEntity } from '../companies/companies.entity';
import { PlansEntity } from '../plans/plans.entity';

@Entity('company_subscription_history')
export class CompanySubscriptionHistoryEntity
  extends BaseEntity
  implements CompanySubscriptionHistory
{
  // Not null columns
  @Column({ name: 'company_id', type: 'integer' })
  companyId: number;

  @Column({ name: 'plan_id', type: 'integer' })
  planId: number;

  @Column({
    name: 'payment_status',
    type: 'enum',
    enum: CompanySubscriptionPaymentStatus,
  })
  paymentStatus: CompanySubscriptionPaymentStatus;

  @Column({ name: 'started_at', type: 'timestamp with time zone' })
  startedAt: Date;

  // Nullable columns
  @Column({
    name: 'ended_at',
    type: 'timestamp with time zone',
    nullable: true,
  })
  endedAt?: Date;

  @Column({
    name: 'amount_paid',
    type: 'numeric',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  amountPaid?: number;

  @Column({
    name: 'stripe_subscription_id',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  stripeSubscriptionId?: string;

  @Column({
    name: 'stripe_payment_intent_id',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  stripePaymentIntentId?: string;

  @Column({ type: 'jsonb', nullable: true, default: () => "'{}'" })
  metadata?: object;

  // FK columns
  // (companyId, planId já estão acima)

  // Relationships
  @ManyToOne(() => CompaniesEntity, (company) => company.subscriptionHistory, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'company_id' })
  company: Relation<CompaniesEntity>;

  @ManyToOne(() => PlansEntity, (plan) => plan.subscriptionHistory, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'plan_id' })
  plan: Relation<PlansEntity>;
}
