import { Entity, Column, ManyToOne, JoinColumn, Relation } from 'typeorm';
import { BaseEntity } from '../../../shared/database/entities/base.entity';
import { SpaceManager } from './space-managers.model';
import { SpacesEntity } from '../spaces/spaces.entity';
import { UsersEntity } from '../users/users.entity';
import { CompaniesEntity } from '../companies/companies.entity';

@Entity('space_managers')
export class SpaceManagersEntity extends BaseEntity implements SpaceManager {
  @Column({ name: 'space_id', type: 'integer' })
  spaceId: number;

  @ManyToOne(() => SpacesEntity)
  @JoinColumn({ name: 'space_id' })
  space: Relation<SpacesEntity>;

  @Column({ name: 'user_id', type: 'integer' })
  userId: number;

  @ManyToOne(() => UsersEntity)
  @JoinColumn({ name: 'user_id' })
  user: Relation<UsersEntity>;

  @Column({ name: 'company_id', type: 'integer' })
  companyId: number;

  @ManyToOne(() => CompaniesEntity)
  @JoinColumn({ name: 'company_id' })
  company: Relation<CompaniesEntity>;

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
