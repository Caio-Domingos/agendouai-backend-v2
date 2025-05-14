import { Entity, Column, OneToMany, Relation } from 'typeorm';
import { BaseEntity } from '../../../shared/database/entities/base.entity';
import { Plan } from './plans.model';
import { CompanySubscriptionHistoryEntity } from '../company-subscription-history/company-subscription-history.entity';

@Entity('plans')
export class PlansEntity extends BaseEntity implements Plan {
  // Not null columns
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'varchar', length: 20 })
  interval: string;

  // Nullable columns
  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'jsonb', default: () => "'{}'" })
  features?: object;

  @Column({ type: 'boolean', default: true })
  active?: boolean;

  @Column({
    name: 'stripe_plan_id',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  stripePlanId?: string;

  // FK columns
  // (none)

  // Relationships
  @OneToMany(() => CompanySubscriptionHistoryEntity, (csh) => csh.plan)
  subscriptionHistory: Relation<CompanySubscriptionHistoryEntity[]>;
}
