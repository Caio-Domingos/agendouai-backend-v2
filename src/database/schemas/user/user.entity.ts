import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Relation,
} from 'typeorm';

import { BaseEntity } from '../../../shared/database/entities/base.entity';
import { CompanyEntity } from '../companies/companies.entity';
import { User, UserRole, UserStatus } from './user.model';
import { SubmissionEntity } from '../submissions/submissions.entity';
import { UnitEntity } from '../units/units.entity';
import { AlertEntity } from '../alerts/alerts.entity';

/**
 * Entidade de usuário para persistência no banco de dados.
 *
 * Implementa a interface User e define as colunas e relacionamentos
 * necessários para o armazenamento de usuários no sistema.
 */
@Entity('users')
@Index('idx_user_company', ['companyId'])
export class UserEntity extends BaseEntity implements User {
  // Propriedades principais
  @Column()
  name: string;

  @Column({ unique: true })
  @Index('idx_user_email')
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
  companyId?: number;

  @Column({ nullable: true, name: 'unit_id' })
  unitId?: number;

  // Relacionamentos
  @ManyToOne(() => CompanyEntity, (company) => company.users, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'company_id' })
  company: Relation<CompanyEntity>;

  @ManyToOne(() => UnitEntity, (unit) => unit.users, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'unit_id' })
  unit: Relation<UnitEntity>;

  @OneToMany(() => SubmissionEntity, (submission) => submission.creator, {
    cascade: true,
  })
  submissions: Relation<SubmissionEntity[]>;
  @OneToMany(() => AlertEntity, (alert) => alert.responseSubmission, {
    cascade: true,
  })
  alertsResponse: Relation<AlertEntity[]>;
}
