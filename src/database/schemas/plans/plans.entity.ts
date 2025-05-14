import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../../shared/database/entities/base.entity';
import { Plan } from './plans.model';

@Entity('plans')
export class PlansEntity extends BaseEntity implements Plan {
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'varchar', length: 20 })
  interval: string;

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

  @Column({
    name: 'created_at',
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
