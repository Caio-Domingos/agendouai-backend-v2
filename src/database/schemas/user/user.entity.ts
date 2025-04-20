import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../shared/database/entities/base.entity';
import { User, UserRole, UserStatus } from './user.model';
import { CompanyEntity } from '../companies/companies.entity';

@Entity('users')
export class UserEntity extends BaseEntity implements User {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.ACTIVE })
  status: UserStatus;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.ADMIN,
  })
  role: UserRole;

  @Column({ nullable: true, name: 'company_id' })
  companyId?: string;

  @ManyToOne(() => CompanyEntity, (user) => user.users)
  @JoinColumn({ name: 'company_id' })
  company: CompanyEntity;
}
