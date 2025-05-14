import { Entity, Column, ManyToOne, JoinColumn, Relation } from 'typeorm';
import { BaseEntity } from '../../../shared/database/entities/base.entity';
import { User, UserStatus, UserPermission } from './users.model';
import { CompaniesEntity } from '../companies/companies.entity';
import { PeopleEntity } from '../people/people.entity';

@Entity('users')
export class UsersEntity extends BaseEntity implements User {
  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.ATIVO,
  })
  status?: UserStatus;

  @Column({ name: 'reset_code', type: 'varchar', length: 100, nullable: true })
  resetCode?: string;

  @Column({ name: 'created_by', type: 'integer' })
  createdBy: number;

  @Column({ name: 'updated_by', type: 'integer' })
  updatedBy: number;

  @Column({
    type: 'enum',
    enum: UserPermission,
    default: UserPermission.USUARIO,
  })
  permission: UserPermission;

  @Column({ name: 'company_id', type: 'integer', nullable: true })
  companyId?: number;

  @ManyToOne(() => CompaniesEntity, { nullable: true })
  @JoinColumn({ name: 'company_id' })
  company: Relation<CompaniesEntity>;

  @Column({ name: 'person_id', type: 'integer', nullable: true })
  personId?: number;

  @ManyToOne(() => PeopleEntity, { nullable: true })
  @JoinColumn({ name: 'person_id' })
  person: Relation<PeopleEntity>;

  @Column({ type: 'varchar', length: 100 })
  username: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ name: 'push_token', type: 'varchar', length: 255, nullable: true })
  pushToken?: string;
}
