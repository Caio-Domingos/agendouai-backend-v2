import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Role } from '../../../auth/decorators/roles.decorator';

@Entity('users')
export class User extends BaseEntity {
  @Column({ length: 100 })
  firstName: string;

  @Column({ length: 100 })
  lastName: string;

  @Column({ unique: true })
  email: string;

  // Tornar o código opcional para evitar o erro de NULL
  @Column({ unique: true, nullable: true })
  code: string;

  @Column({ select: false })
  password: string;

  @Column({ type: 'simple-array', default: Role.USER })
  roles: string[];

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  lastLogin: Date;

  @Column({ default: 0 })
  loginAttempts: number;
}
