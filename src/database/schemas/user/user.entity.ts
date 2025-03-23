import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../../shared/database/entities/base.entity';
import { User, UserStatus } from './user.model';

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
}
