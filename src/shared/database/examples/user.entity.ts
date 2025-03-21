import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../entities/base.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column({ length: 100 })
  firstName: string;

  @Column({ length: 100 })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  code: string;

  @Column({ select: false })
  password: string;

  @Column({ default: true })
  isActive: boolean;
}
