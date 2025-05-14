import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Relation,
  Index,
} from 'typeorm';
import { BaseEntity } from '../../../shared/database/entities/base.entity';
import { SpaceManager } from './space-managers.model';
import { SpacesEntity } from '../spaces/spaces.entity';
import { UserEntity } from '../users/users.entity';
import { CompaniesEntity } from '../companies/companies.entity';

@Entity('space_managers')
@Index('IDX_SPACE_MANAGERS_SPACE', ['spaceId'])
@Index('IDX_SPACE_MANAGERS_USER', ['userId'])
@Index('IDX_SPACE_MANAGERS_COMPANY', ['companyId'])
export class SpaceManagersEntity extends BaseEntity implements SpaceManager {
  @Column({ name: 'space_id', type: 'integer' })
  spaceId: number;

  @ManyToOne(() => SpacesEntity)
  @JoinColumn({ name: 'space_id' })
  space: Relation<SpacesEntity>;

  @Column({ name: 'user_id', type: 'integer' })
  userId: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: Relation<UserEntity>;

  @Column({ name: 'company_id', type: 'integer' })
  companyId: number;

  @ManyToOne(() => CompaniesEntity)
  @JoinColumn({ name: 'company_id' })
  company: Relation<CompaniesEntity>;
}
