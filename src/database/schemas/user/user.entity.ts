import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from '../../../shared/database/entities/base.entity';
import { CompanyEntity } from '../companies/companies.entity';
import { User, UserRole, UserStatus } from './user.model';

/**
 * Entidade de usuário para persistência no banco de dados.
 *
 * Implementa a interface User e define as colunas e relacionamentos
 * necessários para o armazenamento de usuários no sistema.
 */
@Entity('users')
export class UserEntity extends BaseEntity implements User {
  // Propriedades principais
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
  companyId?: number;

  // Relacionamentos
  @ManyToOne(() => CompanyEntity, (company) => company.users)
  @JoinColumn({ name: 'company_id' })
  company: CompanyEntity;
}
