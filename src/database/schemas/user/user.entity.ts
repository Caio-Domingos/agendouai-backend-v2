import { Column, Entity, Index } from 'typeorm';

import { BaseEntity } from '../../../shared/database/entities/base.entity';
import { User, UserRole, UserStatus } from './user.model';

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
}
