import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Relation,
  Index,
} from 'typeorm';
import { BaseEntity } from '../../../shared/database/entities/base.entity';
import { User, UserStatus, UserPermission } from './users.model';
import { CompaniesEntity } from '../companies/companies.entity';
import { PeopleEntity } from '../people/people.entity';

@Entity('users')
@Index('IDX_USERS_USERNAME', ['username'], { unique: true })
@Index('IDX_USERS_COMPANY', ['companyId'])
@Index('IDX_USERS_PERSON', ['personId'])
@Index('IDX_USERS_PERMISSION', ['permission'])
@Index('IDX_USERS_STATUS', ['status'])
@Index('IDX_USERS_CREATED_BY', ['createdBy'])
@Index('IDX_USERS_UPDATED_BY', ['updatedBy'])
export class UserEntity extends BaseEntity implements User {
  // Not null columns
  @Column({ name: 'created_by', type: 'integer' })
  createdBy: number;

  @Column({ name: 'updated_by', type: 'integer' })
  updatedBy: number;

  @Column({
    type: 'enum',
    enum: UserPermission,
    default: UserPermission.USER,
  })
  permission: UserPermission;

  @Column({ type: 'varchar', length: 100 })
  username: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  // Nullable columns
  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.ACTIVE,
  })
  status?: UserStatus;

  @Column({ name: 'reset_code', type: 'varchar', length: 100, nullable: true })
  resetCode?: string;

  @Column({ name: 'company_id', type: 'integer', nullable: true })
  companyId?: number;

  @Column({ name: 'person_id', type: 'integer', nullable: true })
  personId?: number;

  @Column({ name: 'push_token', type: 'varchar', length: 255, nullable: true })
  pushToken?: string;

  // FK columns
  // (companyId, personId já estão acima)

  // Relationships
  @ManyToOne(() => CompaniesEntity, (company) => company.people, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'company_id' })
  company: Relation<CompaniesEntity>;

  @ManyToOne(() => PeopleEntity, (person) => person.users, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'person_id' })
  person: Relation<PeopleEntity>;
}
